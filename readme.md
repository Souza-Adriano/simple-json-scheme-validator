# Simple JSON Validator.

## Um validador de JSON construido em typescript com o objetivo de aprender o processo de publicação de pacotes com typescript.
<br/>

## Exemple
```typescript 
import JsonValidator from 'simple-json-scheme-validator';

const obj = {
    name: '',
    age: 12,
    email: ''
}

const UserValidator = JsonValidator((validator, Body) => {
    validator.string(Body.name, 'name')
        .required(true)
        .min(3)
        .max(50)

    validator.number(Body.age, 'age')
        .required(true)
        .min(16)

    validator.string(Body.email, 'email')
        .email()
})

try {
    UserValidator(obj)
} catch(e) {
    throw e // if object fail on validate the error is catch here.
}
```

*[by: Adriano de Souza](azuos.adriano@gmail.com)*