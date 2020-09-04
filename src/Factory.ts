import Validator from './Validator';
import { cloneBody } from './Utils';

export type ValidatorSchema = (validator: Validator, BodyDTO: any) => void
export default <T = any>(cb: ValidatorSchema) => (BodyDTO: any): T => {
    try {
        const validator = new Validator();
        const Body = cloneBody(BodyDTO);
        cb(validator, Body);

        return Body;
    } catch (error) {
        throw new Error(error.message)
    }
}