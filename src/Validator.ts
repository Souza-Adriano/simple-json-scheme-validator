import Core from './Core'
import { ValidatorSchema } from './Factory'

export default class Validator {
    constructor() {}

    public string(value:string, name: string) {
        return new Core.StringValidator(value, name);
    }

    public number(value: number, name: string) {
        return new Core.NumberValidator(value, name);
    }

    public boolean(value: boolean, name: string) {
        return new Core.BooleanValidator(value, name);
    }

    public propertie(value: any, name: string) {
        if(value === undefined) { throw new TypeError(`propertie ${name} not found`) }
        if(value === null) { throw new TypeError(`propertie ${name} not found`) }
    }

    public list<T = any, R = T>(value: T[], name: string, validator: ValidatorSchema): R[] {
        const result: any[] = value.map((item, index) => {
            try {
                validator(new Validator(), item)
                return item;
            } catch (error) {
                throw new TypeError(`index: ${index} of propertie ${name} failed on validate by:\n ${error.message || error.toString()}`)
            }
        })

        return result;
    }
}