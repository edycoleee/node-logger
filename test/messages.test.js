//messages.test.js
import Joi from "joi";

describe('Joi', function () {
  it('should can use custom messages', function () {
    const schema = Joi.string().min(3).max(10).required().messages({
      'string.min': '{{#label}} panjang harus minimal {{#limit}} karakter',
      'string.max': '{{#label}} panjang harus maksimal {{#limit}} karakter',
    });

    const request = "aaaaaaaaaaaaaaaaaaa";

    const result = schema.validate(request);
    console.info(result); //error: [Error [ValidationError]: "value" panjang harus maksimal 10 karakter]
  });

  it('should can use custom messages in object validation', function () {
    const schema = Joi.object({
      username: Joi.string().required().email().messages({
        'any.required': '{{#label}} harus diisi',
        'string.email': '{{#label}} harus valid email',
      }),
      password: Joi.string().required().min(6).max(10).messages({
        'any.required': '{{#label}} harus diisi',
        'string.min': '{{#label}} harus lebih dari {{#limit}} karakter',
        'string.max': '{{#label}} harus kurang dari {{#limit}} karakter',
      })
    });

    const request = {
      username: "edy@pzn.com",
      password: "edy12345"
    };
    const result = schema.validate(request, {
      abortEarly: false
    });
    console.info(result); //{ value: { username: 'edy@pzn.com', password: 'edy12345' } }
  })
})