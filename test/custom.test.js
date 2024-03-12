//custom.test.js
import Joi from "joi";

describe('Joi', function () {
  it('should can create custom validation', function () {
    const registerSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(6).max(100).custom((value, helpers) => {
        // jika dalam keadaan isinya variable 'edy'
        if (value.startsWith('edy')) {
          return helpers.error('password.wrong');
        }
        return value;
      }).messages({
        'password.wrong': 'password can not start with "edy"'
      }),
      confirmPassword: Joi.string().required().min(6).max(100),
    }).custom((value, helpers) => {
      if (value.password !== value.confirmPassword) {
        return helpers.error('register.password.different');
      }
      return value;
    }).messages({
      'register.password.different': 'password and confirmPassword is different'
    });

    const request = {
      username: "edy@pzn.com",
      password: "12345edy",
      confirmPassword: "salah12345"
    };
    const result = registerSchema.validate(request, {
      abortEarly: false
    });
    console.info(result); // error: [Error [ValidationError]: password and confirmPassword is different]
  });
});
