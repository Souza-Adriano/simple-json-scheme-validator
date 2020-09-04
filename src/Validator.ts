import StringValidator from './Core/String';
import NumberValidator from './Core/Number';
import BooleanValidator from './Core/Boolean';
import { ValidatorSchema } from './Factory'
import { cloneBody } from './Utils';

export { StringValidator, NumberValidator, BooleanValidator }
export default class Validator {
    constructor() {}

    public string(value:string, name: string) {
        return new StringValidator(value, name);
    }

    public number(value: number, name: string) {
        return new NumberValidator(value, name);
    }

    public boolean(value: boolean, name: string) {
        return new BooleanValidator(value, name);
    }

    public propertie(value: any, name: string) {
        if(value === undefined) { throw new TypeError(`propertie ${name} not found`) }
        if(value === null) { throw new TypeError(`propertie ${name} not found`) }
    }

    public list<T = any, R = T>(value: T[], name: string, validator: ValidatorSchema): R[] {
        const result: any[] = value.map((item, index:) => {
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