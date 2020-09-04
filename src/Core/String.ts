import AbstractValidator from './AbstractValidator';

type PasswordStrength = 'STRONG' | 'MEDIUM' | 'WEEK';

export default class StringValidator extends AbstractValidator<string> {
    constructor(value: string, propertie: string) {
        super(value, propertie, 'string');
        this.isRequired();
    }

    public min(value: number): this {
        if (this.type === 'undefined') { return this }
        const result = this.value.length >= value;
        this.setResult(`the minimun length is ${value}`, result);
        return this;
    }

    public max(value: number): this {
        if (this.type === 'undefined') { return this }
        const result = this.value.length <= value;
        this.setResult(`the maximun length is ${value}`, result);
        return this;
    }

    public length(value: number): this {
        if (this.type === 'undefined') { return this }
        const result = this.value.length === value;
        this.setResult(`need a exact ${value} length`, result);
        return this;
    }

    public options(options: string[]): this {
        if (this.type === 'undefined') { return this }
        const value = options.indexOf(this.value);
        const result = value !== -1;

        this.setResult(`options need in [ ${options.join(', ')} ]`, result);
        return this;
    }

    public equal(value: string): this {
        if (this.type === 'undefined') { return this }
        const result = this.value === value;
        this.setResult(`the value need is equal ${value}`, result);

        return this;
    }

    public mask(mask: RegExp, callback: (mask:RegExp, value: string) => boolean): this {
        if (this.type === 'undefined') { return this }
        const result = callback(mask, this.value);
        this.setResult(`not match with expected`, result);

        return this;
    }

    public pipe<T = string>(dto: any, process: (value: string) => T) {
        if (this.type === 'undefined') { return this }
        try { dto[this.propertie] = process(this.value) }
        catch (error) { this.setResult(`${error.message}`, false); }

        return this;
    }

    public email(provider: string = '', DTO?: any) {
        if (this.type === 'undefined') { return this }
        const validate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const email = `${this.value}${provider}`;
        const result = validate.test(email);

        this.setResult(`this ${email} is not a valid email`, result);

        if (DTO) { DTO[this.propertie] = email };
        return this;
    }

    private passwordStrength() {
        const strong = new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g');
        const medium = new RegExp('^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g');
        const week = new RegExp('(?=.{6,}).*', 'g');

        const strongResult = strong.test(this.value);
        const mediumResult = medium.test(this.value);
        const weekResult = week.test(this.value);

        return { strong: strongResult, medium: mediumResult, week: weekResult };
    }

    public password(strength: PasswordStrength = 'STRONG'): this {
        const results = this.passwordStrength();
        switch (strength) {
            case 'STRONG': this.setResult(`password strength need is strong`, results.strong); break;
            case 'MEDIUM': this.setResult(`password strength need is medium`, results.medium); break;
            case 'WEEK': this.setResult(`password strength need is week`, results.week); break;
        }

        return this;
    }
}