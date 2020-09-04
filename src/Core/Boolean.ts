import AbstractValidator from './AbstractValidator';

export default class BooleanValidator extends AbstractValidator<boolean> {
    constructor(value: boolean, propertie: string) {
        super(value, propertie, 'boolean');
        this.isRequired();
    }

    public true(): this {
        if (this.type === 'undefined') { return this }
        const result = this.value === true;
        this.setResult(`need is a true`, result);
        return this;
    }

    public false(): this {
        if (this.type === 'undefined') { return this }
        const result = this.value === false;
        this.setResult(`need is a false`, result);
        return this;
    }
}