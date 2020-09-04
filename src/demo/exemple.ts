import JsonValidator from '..';

const obj = {
    name: '',
    age: 12,
    email: ''
}

const UserValidator = JsonValidator((validator, Body) => {
    validator.string(Body.name, 'name')
        .required()
        .min(3)
        .max(50)

    validator.number(Body.age, 'age')
        .required()
        .min(16)

    validator.string(Body.email, 'email')
        .required()
        .email()

    validator.list(Body.friends, 'friends', (validator, Body) => {
        validator.string(Body, 'name')
            .required(true)
            .min(3)
            .max(50);
    })
})

try {
    UserValidator(obj)
} catch(e) {
    throw e // if object fail on validate the error is catch here.
}