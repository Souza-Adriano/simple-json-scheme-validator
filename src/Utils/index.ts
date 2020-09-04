export const cloneBody = <T = any>(BodyDTO: T): T => JSON.parse(JSON.stringify(BodyDTO));

export default {
    cloneBody,
}