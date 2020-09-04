import AbstractValidator from './AbstractValidator';

export default class NumberValidator extends AbstractValidator<number> {
    constructor(value: number, propertie: string) {
        super(value, propertie, 'number');
        this.isRequired();
    }

    public min(value: number): this {
        if (this.type === 'undefined') { return this }
        const result = this.value >= value;
        this.setResult(`the minimun is ${value}`, result);
        return this;
    }

    public max(value: number): this {
        if (this.type === 'undefined') { return this }
        const result = this.value <= value;
        this.setResult(`the maximun is ${value}`, result);
        return this;
    }

    public options(options: number[]): this {
        if (this.type === 'undefined') { return this }
        const value = options.indexOf(this.value);
        const result = value !== -1;

        this.setResult(`options need in ${options.join(',')}`, result);
        return this;
    }

    public between(start: number, end: number): this {
        if (this.type === 'undefined') { return this }
        const startResult = this.value >= start;
        const endResult = this.value <= end;

        const result = (startResult === true && endResult === true)
        this.setResult(`the value need is betwen (${start}, ${end})`, result);

        return this;
    }

    public equal(value: number): this {
        if (this.type === 'undefined') { return this }
        const result = this.value === value;
        this.setResult(`the value need is equal ${value}`, result);

        return this;
    }
}