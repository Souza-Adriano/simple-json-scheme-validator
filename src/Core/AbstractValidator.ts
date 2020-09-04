import KindOf from 'kind-of'

type TypeValue = 'string' | 'number' | 'boolean'

export default abstract class AbstractValidator<T> {
    protected propertie: string;
    protected value: T;
    protected typeValue: TypeValue
    protected requirement: boolean;

    constructor(value: T, propertie: string, type: TypeValue) {
        this.propertie = propertie;
        this.value = value;
        this.typeValue = type;
        this.requirement = false;
    }

    protected setResult(message: string, result: boolean) {
        if(result === false) {
            const msg = `fail on validate ${this.propertie}\n${message}`;
            throw new TypeError(msg);
        }
    }

    protected get type(): string {
        return KindOf(this.value);
    }

    protected isRequired() {
        if(this.requirement === true) {
            const result = this.type === this.typeValue
            this.setResult(`Type required is ${this.typeValue} but got ${this.type}`, result)
        } else {
            const result = (this.type === 'undefined' || this.type === this.typeValue);
            this.setResult(`Type required is ${this.typeValue} but got ${this.type}`, result)
        }
    }

    public required(value: boolean = true): this {
        this.requirement = value;
        this.isRequired();
        return this;
    }

    public default(DTO: any, value: T): this {
        if (this.type === 'undefined') {
            DTO[this.propertie] = value;
            return this
        }

        return this
    }

    public generate(DTO: any, strategy: () => T): this{
        DTO[this.propertie] = strategy();

        return this
    }
}