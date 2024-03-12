## Belajar Node Validation

- https://docs.google.com/presentation/d/12i_PjbgtvCq71sK5lq7bhxyfYsFug8ALku2nZ5E8dOI/edit?usp=sharing
- https://github.com/ProgrammerZamanNow/belajar-nodejs-validation

1. Persiapan

```
//Membuat Repo di github
repository
https://github.com/edycoleee/node-logger.git
echo "# node-logger" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/edycoleee/node-logger.git
git push -u origin main

//init dan instal depedency
npm init
npm install jest --save-dev
npm install babel-jest --save-dev
npm install @babel/preset-env --save-dev
npm install @babel/plugin-transform-runtime  --save-dev

npm install winston winston-daily-rotate-file

//Edit file package.json

"main": "./src/index.js",
  "type": "module",
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "maxConcurrency" : 2,
    "verbose": true,
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
    "collectCoverage": true,
    "coverageThreshold": {
      "global": {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    },
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}",
      "!vendor/**/*.{js,jsx}"
    ]
  },

//Tambahkan File babel.config.json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}

//Tambahkan File .gitignore
node_modules
build
npm-debug.log
.nyc
.env
.DS_Store
.idea
coverage
*.log

```

2. NodeJS Validation

- Saat kita membuat aplikasi, validasi adalah salah satu hal yang sangat penting untuk kita lakukan
- Validasi memastikan bahwa data sudah dalam keadaan benar atau sesuai sebelum di proses
- Validasi dilakukan untuk menjaga agar data kita tetap konsisten dan tidak rusak
- Validasi biasanya dilakukan di kode aplikasi, dan di constraint table di database

- NodeJS sayangnya tidak menyediakan package untuk validasi, oleh karena itu kita perlu melakukan validasi secara manual
- Tapi untungnya, banyak package yang dibuat oleh komunitas programmer NodeJS yang bisa kita gunakan untuk mempermudah kita melakukan validasi
- Salah satu library yang populer untuk melakukan validasi adalah library Joi
- https://www.npmjs.com/package/joi

`npm install joi`

3. Schema

- Hal pertama yang perlu kita lakukan untuk melakukan validasi adalah membuat Schema
- Schema adalah aturan-aturan yang sudah kita tentukan
- Setelah membuat schema, baru selanjutnya kita bisa melakukan validasi data menggunakan schema tersebut

```
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

});
```

4. Validasi Tipe Data

- String : https://joi.dev/api/?v=17.9.1#string
- Number : https://joi.dev/api/?v=17.9.1#number
- Boolean : https://joi.dev/api/?v=17.9.1#boolean

```
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

    const resultIsAdmin = isAdminSchema.validate("true");
    console.info(resultIsAdmin);

    console.info(typeof "true");
    console.info(typeof resultIsAdmin.value);
    console.info(typeof resultIsAdmin.error);

    const resultPrice = priceSchema.validate("10000");
    console.info(resultPrice);
  });

});
```

5. Date Validation

```
//date.test.js
import Joi from "joi";

describe('Joi', function () {
  it('should can validate date', function () {
    const birthDateSchema = Joi.date().required().max("now").min("1-1-1988");

    const result = birthDateSchema.validate("1-1-1987");
    console.info(result);
    console.info(typeof result.value); // Date
    console.info(typeof result.error); // ValidationError

    const result2 = birthDateSchema.validate("12-25-1990");
    console.info(result2);

    const result3 = birthDateSchema.validate("12-25-2027");
    console.info(result3);
  });
});

```

6. Validation Result

- Saat kita melakukan validasi menggunakan method validate(), hasil dari method tersebut adalah object yang memiliki attribute **_value dan error_**
- Hasil data akan ada di attribute value, contohnya misal kita validasi Date namun inputnya berupa String, maka secara otomatis value Date yang akan di konversi ke result.value
- Namun jika terjadi error, secara otomatis result.error nya berisi ValidationError

- value >> isi dari variable tersebut
- error >> bentuk object isinya macam2 detail

```
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
```

7. Validation Error

```
//validation-error.test.js

import Joi from "joi";

describe('Joi', function () {
  it('should return validation error', function () {
    const usernameSchema = Joi.string().min(5).email().required();
    // validation tanpa method
    const result = usernameSchema.validate("ups");
    console.info(result);

    if (result.error) {
      result.error.details.forEach(detail => {
        console.info(`${detail.path} = ${detail.message}`);
      });
    }
  });
});
```

```
    {
      value: 'ups',
      error: [Error [ValidationError]: "value" length must be at least 5 characters long. "value" must be a valid email] {
        _original: 'ups',
        details: [ [Object], [Object] ]
      }
    }
```

8. Validation Option

Saat kita melakukan validasi menggunakan validate() method, sebenarnya terdapat opsi tambahan yang bisa kita kirim untuk mengatur cara melakukan validasi

```
//validation-error.test.js

import Joi from "joi";

describe('Joi', function () {
  it('should return validation error', function () {
    const usernameSchema = Joi.string().min(5).email().required();
    // validation tanpa method >> {abortEarly: false}
    const result = usernameSchema.validate("ups", {
      abortEarly: false
    });
    console.info(result);

    if (result.error) {
      result.error.details.forEach(detail => {
        console.info(`${detail.path} = ${detail.message}`);
      });
    }
  });
});
```

9. Object Validation

- Saat kita membuat aplikasi, kita sering sekali membuat JavaScript Object
- Untungnya Joi juga bisa digunakan untuk melakukan validasi JS Object, sehingga mempermudah kita untuk melakukan sekaligus ke semua field di JS Object
- https://joi.dev/api/?v=17.9.1#object

Nested Object

- Joi juga bisa digunakan untuk memvalidasi nested object
- Saat kita ingin memvalidasi nested object, kita harus tentung object schema nya juga

```
//object.test.js
import Joi from "joi";

describe('Joi', function () {
  it('should can validate object', function () {
    //schema login
    const loginSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(6).max(100)
    });

    const request = {
      username: "edy@pzn.com",
      password: "rahasia"
    };

    const result = loginSchema.validate(request, {
      abortEarly: false
    });

    console.info(result);
  });

  it('should can validate nested object', function () {
    //address dengan nested object >> object did alam object
    const createUserSchema = Joi.object({
      id: Joi.string().required().max(100),
      name: Joi.string().required().max(100),
      address: Joi.object({
        street: Joi.string().required().max(200),
        city: Joi.string().required().max(100),
        country: Joi.string().required().max(100),
        zipCode: Joi.string().required().max(10)
      }).required()
    });

    const request = {
      address: {

      }
    };

    const result = createUserSchema.validate(request, {
      abortEarly: false
    });

    // console.info(result);

    if (result.error) {
      result.error.details.forEach(value => {
        console.info(`${value.path} : ${value.message}`);
      })
    }
  });
});

```

10. Array Validation

- Selain Object, kita juga bisa melakukan validasi di data Array
- Baik itu array dengan isi data sederhana, atau array dengan isi data object
- https://joi.dev/api/?v=17.9.1#array

```
//array.test.js
import Joi from "joi";

describe('Joi', function () {
  it('should can validate array', function () {
    const hobbiesSchema = Joi.array().items(
      Joi.string().required().min(3).max(100)
    ).min(1).unique();

    const hobbies = ["A", "Reading", "Coding", "Coding"];

    const result = hobbiesSchema.validate(hobbies, {
      abortEarly: false
    });
    console.info(result);
  });
});
```

```
  console.info
    {
      value: [ 'A', 'Reading', 'Coding', 'Coding' ],
      error: [Error [ValidationError]: "[0]" length must be at least 3 characters long. "[3]" contains a duplicate value] {
        _original: [ 'A', 'Reading', 'Coding', 'Coding' ],
        details: [ [Object], [Object] ]
      }
    }
```

11. Array of Object

Untuk melakukan validasi Array of Object, kita bisa kombinasikan schema array dan schema object

```
//array.test.js
import Joi from "joi";

describe('Joi', function () {

  it('should can validate array of object', function () {
    const addressesSchema = Joi.array().min(1).items(Joi.object({
      street: Joi.string().required().max(200),
      city: Joi.string().required().max(100),
      country: Joi.string().required().max(100),
      zipCode: Joi.string().required().max(10)
    }));

    const addresses = [
      {
        street: "Jalan belum ada"
      }
    ];

    const result = addressesSchema.validate(addresses, {
      abortEarly: false
    });
    console.info(result);
  });
});
```

```
  console.info
    {
      value: [ { street: 'Jalan belum ada' } ],
      error: [Error [ValidationError]: "[0].city" is required. "[0].country" is required. "[0].zipCode" is required] {
        _original: [ [Object] ],
        details: [ [Object], [Object], [Object] ]
      }
    }
```

12. Custom Validation Message

- Saat kita menggunakan validation milik Joi, terdapat default error message yang direpresentasikan menggunakan message key
- Kita bisa lihat semua message key dan value nya di disini :
- https://joi.dev/api/?v=17.9.1#list-of-errors
- Jika kita mau, kita bisa mengubah value dari message key, ketika membuat schema, sehingga secara otomatis
- Untuk menggubah message nya, kita bisa menggunakan method messages() pada schema
- https://joi.dev/api/?v=17.9.1#anymessagesmessages

```
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
```

13. Custom Validation

```
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

```
