//validation.test.js
import Joi from "joi"

describe('Joi', function () {
  it('should can create schema', function () {

    //1. buat schema
    const schema = Joi.string().min(3).max(100).required();

    //2. masukkan variable utk di validate dg schema
    const result = schema.validate("Edy");

    //3. hasilnya akan tampil jika error
    if (result.error) {
      console.info(result.error);
    }
  });

  it('should can validate basic data type', function () {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().min(1000).max(1000000);

    const resultUsername = usernameSchema.validate("edy@gmail.com");
    console.info(resultUsername);
    console.info(typeof resultUsername.value); //edy@gmail.com

    const resultIsAdmin = isAdminSchema.validate("true");
    console.info(resultIsAdmin);

    console.info(typeof "true");
    console.info(typeof resultIsAdmin.value); //boolean >> true
    console.info(typeof resultIsAdmin.error); //object error

    const resultPrice = priceSchema.validate("10000");
    console.info(resultPrice);
    console.info(typeof resultPrice.value); //10000
    console.info(typeof resultPrice.error); //object error
  });

});