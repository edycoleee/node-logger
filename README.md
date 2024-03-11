## Belajar Node Logging

Sumber :
https://docs.google.com/presentation/d/1UoGN0HrQZOI7YGF55IRwA5Ao8cZ1mBHKqhpOwuRiaEk/edit?usp=sharing

https://github.com/ProgrammerZamanNow/belajar-nodejs-expressjs

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
npm install supertest --save-dev

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

2. Logging

Log file adalah file yang berisikan informasi kejadian dari sebuah sistem
Biasanya dalam log file, terdapat informasi waktu kejadian dan pesan kejadian
Logging adalah aksi menambah informasi log ke log file
Logging sudah menjadi standard industri untuk menampilkan informasi yang terjadi di aplikasi yang kita buat
Logging bukan hanya untuk menampilkan informasi, kadang digunakan untuk proses debugging ketika terjadi masalah di aplikasi kita

## Express JS

1. Application

Saat kita membuat web menggunakan ExpressJS, kita akan membuat object Application
Application adalah object utama dalam library ExpressJS

```
import express from "express";

const app = express();

```

Menjalankan Application

Application secara default tidak berjalan, jika kita ingin menjalankan Application nya, kita perlu menggunakan method listen(port)

```
import express from "express";

const app = express();

app.listen(3000, () => {
    console.info("Server started on port 3000");
});
```

Menggunakan module nodemon agar tidak perlu restart server selama masa dev

```
npm install --save-dev nodemon

\\package.json
  "scripts": {
    "start": "node ./src/index.js",
    "dev": "nodemon ./src/index.js"
  },
```

npm run dev

2. Routing

`app.get('/', (req, res, next) => {res.send("Hello World")})`

Routing merupakan teknik yang digunakan untuk meneruskan request dari URL Path ke callback yang kita tuju
Routing di ExpressJS bisa menggunakan object Application, dan menggunakan method sesuai dengan nama HTTP Method nya

- app.connect(path, callback)
- app.get(path, callback)
- app.post(path, callback)
- app.put(path, callback)
- app.delete(path, callback)

```
import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/edy', (req, res) => {
    res.send("Hello Edy");
});

app.listen(3000, () => {
    console.info("Server started on port 3000");
});
```

3. Unit Test

Salah satu yang sulit ketika membuat aplikasi web yang harus berjalan yaitu melakukan automation test
Jika melakukan manual test, terlihat mudah tinggal kita buka melalui web browser

**Supertest** adalah salah satu library yang bisa digunakan untuk membantu melakukan pengetesan web ExpressJS

```
npm install supertest --save-dev
```

Contoh Test

```
//src/index.js
import express from "express";

export const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/edy', (req, res) => {
    res.send("Hello Edy");
});

//app.listen(3000, () => {
//    console.info("Server started on port 3000");
//});
```

```
//test/request.test.js
//import express from "express";
import request from "supertest";
import { app } from "../src/index.js";

// const app = express();

// app.get('/', (req, res) => {
//     res.send("Hello World");
// });

test("Test ExpressJS", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello World");
});
```

jalankan test

npx jest request.test.js

4. Request

Saat kita membuat callback di router, parameter pertama adalah **object Request**, yang secara otomatis diisi oleh ExpressJS
Object Request akan berisikan informasi tentang HTTP Request yang masuk ke callback tersebut
Ada banyak sekali informasi HTTP Request yang bisa kita ambil dari object Request, seperti Query Param, Header, Body dan lain-lain.
**Request URL, Request Query Param, Request Header**

```
app.get('/req-http', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});
```

```
import request from "supertest";
import { app } from "../src/index.js";

test("Test Query Parameter", async () => {
    const response = await request(app).get("/req-http").query({ name: "Edy" });
    expect(response.text).toBe("Hello Edy");
});

//npx jest request-http.test.js
```

5. Request URL

```
app.get('/req-url/world', (req, res) => {
    res.json({
        path: req.path,
        originalUrl: req.originalUrl,
        hostname: req.hostname,
        protocol: req.protocol,
        secure: req.secure,
    })
});
```

```
import request from "supertest";
import { app } from "../src/index.js";

test("Test Request URL", async () => {
    const response = await request(app)
        .get("/req-url/world")
        .query({ name: "Edy" });
    expect(response.body).toEqual({
        path: "/req-url/world",
        originalUrl: "/req-url/world?name=Edy",
        hostname: "127.0.0.1",
        protocol: "http",
        secure: false,
    });
});
```

6. Request Query Param

Request juga bisa digunakan untuk mengambil data query parameter
Secara otomatis, semua query parameter akan disimpan dalam bentuk object di req.query

```
app.get('/req-par', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
    console.log(req.query)
})
```

```
//http://localhost:3000/req-par?firstName=Edy&lastName=Cole

import request from "supertest";
import { app } from "../src/index.js";


test("Test Query Parameter", async () => {
    const response = await request(app)
        .get("/req-par")
        .query({ firstName: "Edy" , lastName: "Cole"});
    expect(response.text).toBe("Hello Edy Cole");
});
```

7. Request Header
   case insensitive
   Object Request juga bisa kita gunakan untuk mendapatkan informasi dari HTTP Header dari Request
   Kita bisa menggunakan method req.get(name) atau req.header(name) untuk mendapatkan header berdasarkan name, khusus untuk HTTP Header, name nya adalah case insensitive

Menggunakan req.get('key-header')

```
import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
    const type = req.get("accept");
    res.send(`Hello ${type}`);
});

test("Test Query Parameter", async () => {
    const response = await request(app).get("/")
        .set("Accept", "text/plain");
    expect(response.text).toBe("Hello text/plain");
});
```

Menggunakan req.headers['key-header']

```
// Route untuk menangani permintaan POST
app.post('/submit-data', (req, res) => {
  // Mendapatkan nilai header 'x-custom-header' dari permintaan
  const customHeaderValue = req.headers['x-custom-header'];

  // Melakukan sesuatu dengan nilai header yang diterima
  console.log('Nilai x-custom-header:', customHeaderValue);

  // Menanggapi kembali dengan status sukses dan pesan
  res.status(200).send('Data telah diterima!');
});
```

Saat menggunakan rest client extension vs code

```
POST https://example.com/comments HTTP/1.1
content-type: application/json

{
    "name": "sample",
    "time": "Wed, 21 Oct"
}
```

8. Response

Pada Callback Routing ExpressJS, terdapat parameter kedua yaitu response
**Response merupakan object** representasi dari HTTP Response
Kita bisa mengubah data HTTP Response melalui object Response tersebut.
Response Header, Response Body, Redirect

`Response Body Method : Keterangan`

- res.send(data) Response berupa raw data
- res.json(body) Response berupa JSON
- res.download(path, filename, option) Response berupa file download
- res.redirect(url) Response redirect url
- res.sendFile(path, option) Response berupa file

```
app.get('/resp', (req, res) => {
    res.send(`Hello Response`);
});
```

```
import request from "supertest";
import { app } from "../src/index.js";

test("Test Response"), async() => {
  const response = await request(app).get("/resp");
  expect(response.text).toBe("Hello Response");
}
```

9. Response Status

Saat kita ingin mengubah HTTP Status dari HTTP Response yang kita buat, kita bisa menggunakan method res.status(code)

```
app.get('/resp-status', (req, res) => {
    if(req.query.name){
        res.status(200);
        res.send(`Hello ${req.query.name}`);
    }else{
        res.status(400);
        res.end();
    }
});
```

```
import request from "supertest";
import { app } from "../src/index.js";

test("Test Response Status", async () => {
    let response = await request(app).get("/resp-status").query({name: "Edy"});
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello Edy");

    response = await request(app).get("/resp-status");
    expect(response.status).toBe(400);
});
```

9. Response Header

Kita juga bisa mengubah HTTP Response Header dengan menggunakan method res.set(name, value) atau res.header(name, value)
Atau jika ingin langsung beberapa name, kita bisa masukkan dalam bentuk object ke dalam parameter name nya

```
app.get('/resp-header', (req, res) => {
    res.set({
        "X-Powered-By": "Coding Cupu",
        "X-Author": "Edy"
    });
    res.send(`Hello Response`);
});
```

```
import request from "supertest";
import { app } from "../src/index.js";

test("Test Response Header", async () => {
    const response = await request(app).get("/resp-header");
    expect(response.text).toBe("Hello Response");
    expect(response.get("X-Powered-By")).toBe("Coding Cupu");
    expect(response.get("X-Author")).toBe("Edy");
});
```

10. Response Body

Untuk mengubah Response Body, kita bisa menggunakan method res.send(body)
Dimana parameter body bisa kita kirim dalam bentuk buffer atau string, baik itu text, html, json dan lain-lain

```
app.get('/resp-body', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(`<html><body>Hello World</body></html>`);
});
```

```
import request from "supertest";
import { app } from "../src/index.js";

test("Test Response Body", async () => {
    const response = await request(app).get("/resp-body");
    expect(response.get('Content-Type')).toContain('text/html');
    expect(response.text).toBe('<html><body>Hello World</body></html>');
});
```

11. Redirect

Seperti yang pernah dijelaskan di kelas HTTP, untuk melakukan Redirect dari sebuah web ke halaman lain, kita hanya cukup menggunakan HTTP Header Location
Di ExpressJS, kita bisa lakukan manual dengan menggunakan HTTP Header Location, atau bisa dengan bantuan method res.redirect(to)

```
app.get('/resp-redir', (req, res) => {
    res.redirect('/to-next-page');
});
```

```
import request from "supertest";
import { app } from "../src/index.js";

test("Test Response Body", async () => {
    const response = await request(app).get("/resp-body");
    expect(response.get('Content-Type')).toContain('text/html');
    expect(response.text).toBe('<html><body>Hello World</body></html>');
});
```

12. Middleware

Middleware adalah function yang bisa digunakan untuk mengakses request object, response object dan next function dalam alur hidup aplikasi ExpressJS
Jika Middleware memanggil next function, artinya function Middleware selanjutnya atau Router akan dieksekusi

Ada banyak sekali kegunaan dari Middleware, seperti
Eksekusi kode sebelum sebelum router di eksekusi
Mengubah Request atau Response object sebelum router di eksekusi
Mengakhiri response tanpa harus mengeksekusi router
Dan lain-lain

Untuk membuat middleware, kita cukup membuat function dengan 3 parameter, request, response dan next
request adalah request object
response adalah response object
next adalah next function, bisa middleware selanjutnya atau router

A. Contoh 1 Middlware tanpa router

request >> next >> next

```
import express from "express";

const logger = (req, res, next) => {
    console.info(`Receive request: ${req.method} ${req.originalUrl}`);
    next();
};

const addPoweredHeader = (req, res, next) => {
    res.set("X-Powered-By", "Coding Ndeso");
    next();
};


export const app = express();

app.use(logger);
app.use(addPoweredHeader);

app.get('/', (req, res) => {
    res.send("Hello Response");
});

// console.info Receive request: GET /

```

```
import request from "supertest";
import { app } from "../src/index.js";

test("Test Middleware 1", async() => {
    const response = await request(app).get("/");
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.text).toBe("Hello Response");
})
```

B. Contoh 2 Middlware tanpa router

```
import express from "express";

const logger = (req, res, next) => {
    console.info(`Receive request: ${req.method} ${req.originalUrl}`);
    next();
};

const addPoweredHeader = (req, res, next) => {
    res.set("X-Powered-By", "Coding Ndeso");
    next();
};


export const app = express();

app.use(logger);
app.use(addPoweredHeader);

app.get('/', (req, res) => {
    res.send("Hello Response");
});

app.get('/mid1', (req, res) => {
    res.send("Hello Middleware2");
});
```

```
import request from "supertest";
import { app } from "../src/index.js";

test("Test Middleware 2", async() => {
    const response = await request(app).get("/mid1");
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.text).toBe("Hello Middleware2");
})
```

C. Contoh 3 Middlware Api Key Middleware

```
import express from "express";

const logger = (req, res, next) => {
    console.info(`Receive request: ${req.method} ${req.originalUrl}`);
    next();
};

const addPoweredHeader = (req, res, next) => {
    res.set("X-Powered-By", "Coding Ndeso");
    next();
};

const apiKeyMiddleware = (req, res, next) => {
    if(req.query.apiKey){
        next();
    }else{
        res.status(401).end();
    }
};

export const app = express();

app.use(logger);
app.use(addPoweredHeader);
app.use(apiKeyMiddleware);

app.get('/mid3', (req, res) => {
    res.send("Hello Middleware3");
});
```

```
import request from "supertest";
import { app } from "../src/index.js";

test.skip("Test Middleware 1", async() => {
    const response = await request(app).get("/");
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.text).toBe("Hello Response");
})

test("Test Middleware 2", async() => {
    const response = await request(app).get("/mid1");
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.status).toBe(401)
    if (response.status === 401) {
        expect(response.text).toBe("");
    } else {
        expect(response.text).toBe("Hello Middleware2");
    }
})

test("Test Response Middleware 3", async () => {
    const response = await request(app).get("/mid3").query({apiKey: "123"});
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.text).toBe("Hello Middleware3");
});
```

D. Contoh 4 Middleware Unauthorized tanpa apikey

```
const apiKeyMiddleware = (req, res, next) => {
    if(req.query.apiKey){
        next();
    }else{
        res.status(401).end();
    }
};

export const app = express();

app.use(logger);
app.use(addPoweredHeader);
app.use(apiKeyMiddleware);
```

```
// tanpa api key maka request akan ditolak
test("Test Response Middleware Unauthorized", async () => {
    const response = await request(app).get("/mid3");
    expect(response.status).toBe(401);
});

test("Test Response Middleware Authoeized", async () => {
    const response = await request(app).get("/mid3").query({apiKey: "123"});
    expect(response.text).toBe("Hello Middleware3");
});
```

E. Contoh 5 Middleware Time

```

const apiKeyMiddleware = (req, res, next) => {
    if(req.query.apiKey){
        next();
    }else{
        res.status(401).end();
    }
};

const requestTimeMiddleware = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

export const app = express();

app.use(logger);
app.use(addPoweredHeader);
app.use(apiKeyMiddleware);
app.use(requestTimeMiddleware);

//......
app.get('/time', (req, res) => {
    res.send(`Hello , Today Is ${req.requestTime}`);
});
```

```
test("Test Response Middleware Time", async () => {
    const response = await request(app).get("/time").query({apiKey: "123"});
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.text).toContain("Hello , Today Is");
});
```

13. Route Path

Sebelumnya pada materi Basic Routing, kita belajar bagaimana cara melakukan routing dengan HTTP Method sesuai yang kita mau
Sekarang kita akan bahas lebih detail tentang Route Path nya.
Sebelumnya, route path yang kita gunakan tidak dinamis. ExpressJS mendukung route path yang dinamis, dengan cara menggunakan route path string patterns atau regex

Untuk melakukan pengetesan, kita bisa menggunakan website http://forbeslindesay.github.io/express-route-tester/

```
//route-path.test.js

import express from "express";
import request from "supertest";

const app = express();

app.get('/products/*.json', (req, res) => {
  res.send(req.originalUrl);
});

//d+ >> artinya desimal
app.get('/categories/*(\\d+).json', (req, res) => {
  res.send(req.originalUrl);
});

test("Test Route Path", async () => {
  let response = await request(app).get("/products/edy.json");
  expect(response.text).toBe("/products/edy.json");

  response = await request(app).get("/products/salah.json");
  expect(response.text).toBe("/products/salah.json");

  response = await request(app).get("/categories/1234.json");
  expect(response.text).toBe("/categories/1234.json");

//d+ >> artinya desimal >> saat dikirim string maka akan 404
  response = await request(app).get("/categories/salah.json");
  expect(response.status).toBe(404);
});
```

14. Route Parameter

Saat kita membuat aplikasi Web API atau RESTful API, kadang kita sering menyimpan parameter dalam URL Path, misal /products/{idProduct}, atau /categories/{idCategory}, dan lain-lain
ExpressJS mendukung penambahan parameter dalam route path, dengan menggunakan prefix : (titik dua)
Semua data parameter itu bisa kita tambahkan regex jika kita mau, misal /products/:id(\\d+), artinya kita menambah parameter id, dimana id tersebut harus digit
Data route parameter secara otomatis bisa kita ambil sebagai attribute di req.params

```
//route-parameter.test.js
import express from "express";
import request from "supertest";

const app = express();

//id bisa berupa string ataupun numeric
app.get('/products/:id', (req, res) => {
  const idProduct = req.params.id;
  res.send(`Product: ${idProduct}`);
});

//nama bisa berupa string ataupun numeric
app.get('/siswa/:nama', (req, res) => {
  const namaSiswa = req.params.nama;
  res.send(`Nama Siswa: ${namaSiswa}`);
});

//id harus berupa desimal
app.get('/categories/:id(\\d+)', (req, res) => {
  const idCategory = req.params.id;
  res.send(`Category: ${idCategory}`);
});

// mau bikin lebih dari satu parameter
// app.get('/seller/:idSeller/products/:idProduct', (req, res) => {
//     req.params.idSeller;
//     req.params.idProduct;
// });

test("Test Route Parameter", async () => {
  let response = await request(app).get("/products/edy");
  expect(response.text).toBe("Product: edy");

  response = await request(app).get("/products/salah");
  expect(response.text).toBe("Product: salah");

  response = await request(app).get("/categories/1234");
  expect(response.text).toBe("Category: 1234");

  response = await request(app).get("/categories/salah");
  expect(response.status).toBe(404);

  response = await request(app).get("/siswa/silmi");
  expect(response.text).toBe("Nama Siswa: silmi");
});
```

15. Route Function

Kadang ada kasus ketika kita `membuat route path yang sama untuk beberapa tipe HTTP Method`
Pada kasus ini, kita bisa memanfaatkan route(path) function sehingga tidak perlu mendeklarasikan nama path sama untuk beberapa route

```
//route-function.test.js
import express from "express";
import request from "supertest";

const app = express();

app.route("/products")
  .get((req, res) => {
    res.send("Get Product");
  })
  .post((req, res) => {
    res.send("Create Product");
  })
  .put((req, res) => {
    res.send("Update Product");
  });

test("Test Route Function", async () => {
  let response = await request(app).get("/products");
  expect(response.text).toBe("Get Product");

  response = await request(app).post("/products");
  expect(response.text).toBe("Create Product");

  response = await request(app).put("/products");
  expect(response.text).toBe("Update Product");
});
```

16. Router

Saat kita membuat Application ExpressJS, secara default sudah terdapat object Router nya
Namun, kita bisa membuat object Router sendiri jika kita mau, hal ini sangat cocok jika kita ingin melakukan grouping Router, lalu misal kita bisa menambahkan Router tersebut ke Application seperti Middleware
Ini sangat cocok ketika kita ingin membuat fitur modular yang bisa mengaktifkan atau menonaktifkan router secara dinamis misalnya
Dengan object Router, kita bisa memiliki Middleware dan Routing secara independen

```
//router.test.js

import express from "express";
import request from "supertest";

const app = express();

//object router
const router = express.Router();

//contoh jika kita menggunakan router >> middleware
//maka semua melawati middleware ini
router.use((req, res, next) => {
  console.info(`Receive request : ${req.originalUrl}`);
  next();
});

router.get('/feature/a', (req, res) => {
  res.send("feature a");
});

//test sebelum roputer di use di app >> error
test("Test Router Disabled", async () => {
  const response = await request(app).get("/feature/a");
  expect(response.status).toBe(404);
});

//test sebelum roputer di use di app >> route ke yg tuajuan
test("Test Router Enabled", async () => {
  app.use(router);

  const response = await request(app).get("/feature/a");
  expect(response.text).toBe("feature a");
});
```

17. Type of Middleware

Di ExpressJS, terdapat beberapa jenis Middleware

a. Application-level middleware

Yaitu middleware yang digunakan di object Application, sebelumnya kita sudah menggunakan Application-Level Middleware, dengan cara menggunakan function`app.use(middleware)`
Saat kita menggunakan Application-Level Middleware, maka secara otomatis Middleware tersebut akan **dipanggil di semua route**

Jika kita mau menggunakan Middleware hanya untuk di route path tertentu, kita bisa tambahkan route pattern ketika menggunakan app.use(), misal `app.use(“/products/\*”, middleware)`

b. Router-level middleware

Yaitu middleware yang ditambahkan pada object Router yang kita buat menggunakan `express.Router()`
Middleware ini secara otomatis akan dipanggil ketika request masuk ke router ini
Sama seperti dengan Application-Level Middleware,

jika kita ingin middleware nya hanya dipanggil para route path tertentu, kita bisa juga tambahkan route pattern ketika menggunakan middleware nya menggunakan `router.use(path, middleware)`

c. Error-handling middleware

Yaitu middleware yang akan dipanggil ketika terjadi error di aplikasi kita `(throw Error)`
Cara penggunaannya mirip dengan Application-Level Middleware, yang membedakan adalah function callback nya memiliki empat parameter, yaitu **error, request, response dan next**
Object error akan secara otomatis terisi oleh data Error yang terjadi di aplikasi kita
Middleware ini, sangat cocok ketika kita ingin menampilkan tampilan yang berbeda ketika terjadi error di aplikasi kita

d. Built-in middleware

ExpressJS banyak sekali menggunakan Middleware untuk melakukan pemrosesan request dan response, termasuk terdapat Built-in Middleware, yaitu middleware yang sudah terdapat secara otomatis di ExpressJS

- `express.json()`, yaitu middleware yang melakukan parsing request body menjadi JavaScript object
- express.text(), yaitu middleware yang melakukan parsing request body menjadi string
- express.raw(), yaitu middleware yang melakukan parsing request body menjadi Buffer
- `express.urlencoded()`, yaitu middleware yang melakukan parsing request body form menjadi object
- `express.static()`, yaitu middleware yang digunakan untuk melayani file static

e. Third-party middleware

Yaitu middleware buatan orang lain yang kita gunakan
Untuk menggunakannya, kita perlu menambah dependency middleware nya terlebih dahulu

18. Request Body

Sebelumnya kita belum membahas tentang HTTP Request Body
Di ExpressJS, Secara default HTTP Request Body tidak bisa diambil datanya oleh Router Callback, hal ini dikarenakan, jenis data Request Body bisa berbeda-beda, tergantung tipe data yang dikirim
Oleh karena itu, di dalam ExpressJS, terdapat Built-in Middleware, yang digunakan untuk membaca Request Body, lalu melakukan konversi ke tipe data yang diinginkan

- express.json() Membaca request body menjadi bentuk JSON (JavaScript Object)
- express.text() Membaca request body menjadi bentuk string
- express.raw() Membaca request body menjadi bentuk Buffer
- express.urlencoded() Membaca request body menjadi bentuk Form (JavaScript Object)

```
//request-body.test.js

import express from "express";
import request from "supertest";

const app = express();
//middleware json
app.use(express.json());
//middleware form urlencoded
//{ extended: false } >> tdk baca dari query param tapi baca dari body
app.use(express.urlencoded({ extended: false }));

//req body json
app.post('/json', (req, res) => {
  const name = req.body.name;
  res.json({
    hello: `Hello ${name}`
  });
});

//req body form
app.post('/form', (req, res) => {
  const name = req.body.name;
  res.json({
    hello: `Hello ${name}`
  });
});

test("Test Request JSON", async () => {
  const response = await request(app)
    .post("/json")
    .set("Content-Type", "application/json")
    .send({ name: "World" });

  expect(response.body).toEqual({
    hello: `Hello World`
  });
});

test("Test Request Form", async () => {
  const response = await request(app)
    .post("/form")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send("name=World");
  //send mirip query param tapi didalam body
  expect(response.body).toEqual({
    hello: `Hello World`
  });
});
```

19. Cookie >>

- Dalam HTTP, salah satu fitur yang biasa digunakan untuk pertukaran data dari Server dan Client adalah Cookie
- Banyak yang menggunakan Cookie sebagai Session misalnya
- Sayangnya, secara default, ExpressJS tidak mendukung Cookie, tapi jangan khawatir, kita bisa menggunakan Third-Party Middleware untuk mendukung Cookie ini `npm install cookie-parser`
- Cookie Parser

  Cookie Parser adalah salah satu Third-Party Middleware yang bisa kita gunakan untuk mendukung fitur Cookie, dimana dengan Cookie Parser, kita secara otomatis menyimpan data ke Cookie, atau mengambil data ke Cookie
  Setelah kita memasang Cookie Parser Middleware, kita bisa secara otomatis membaca Cookie yang dikirim dari Client melalui req.cookies

```
//cookie.test.js

import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  const name = req.cookies["name"];
  const name1 = req.cookies.name;
  const penulis = req.cookies.author;
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app).get("/")
    //kirim cookie dari client key:value;...
    .set("Cookie", "name=Edy;author=Coding Cupu");
  expect(response.text).toBe("Hello Edy");
});

```

- Menulis Cookie

Sedangkan untuk menulis Cookie, kita bisa tambahkan di response, dengan method `res.cookie(key, value, setting)`,
Dan untuk menghapus Cookie, kita bisa gunakan res.clearCookie(key, setting)

```
//cookie.test.js

import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());


app.post('/login', (req, res) => {
  const name = req.body.name;
  //send cookie dari server
  //res.cookie(key, value, setting)
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});


test("Test Cookie Write", async () => {
  const response = await request(app).post("/login")
    .send({ name: "Edy" });
  expect(response.get("Set-Cookie").toString()).toBe("Login=Edy; Path=/");
  expect(response.text).toBe("Hello Edy");
});
```

- Signed Cookie

Salah satu kelemahan ketika kita menyimpan data di Cookie adalah, Cookie bisa dimodifikasi oleh Client, misal kita bisa modifikasi Cookie di Browser kita
Salah satu cara untuk menjaga agar Cookie tidak dimodifikasi adalah, kita menambahkan `Signature` pada Cookie kita
Setiap nilai Cookie akan ada Signature, dimana ketika nilai Cookie diubah, otomatis Signature tidak akan sama lagi, dan secara otomatis value Cookie tidak dianggap valid lagi
Fitur ini sudah ada di Cookie Parser dengan nama Signed Cookie
Kita wajib menyebutkan Cookie mana yang ingin di Signed, ketika kita membuat Cookie di response
Selain itu, kita juga perlu memasukkan Secret Key untuk digunakan ketika proses pembuatan Signature, pastikan Secret Key nya aman dan tidak mudah ditebak

- Membaca Signed Cookie

Jika kita membuat Cookie sebagai Signed Cookie, maka untuk membacanya, jangan menggunakan req.cookies, melainkan harus menggunakan req.signedCookies

```
//cookie-signed.test.js
import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("CONTOHRAHASIA"));
app.use(express.json());

app.get('/dashboard', (req, res) => {
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
  const name = req.body.name;
  //cara menulis cookie yang signed
  res.cookie("Login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login")
    .send({ name: "Edy" });
  console.info(response.get("Set-Cookie"));
  expect(response.get("Set-Cookie").toString()).toContain("Edy");
  expect(response.text).toBe("Hello Edy");
});

test("Test Cookie Read", async () => {
  const response = await request(app).get("/dashboard")
    .set("Cookie", "Login=s%3AEdy.kAg56apX%2F%2BhWKP557aBjrIGw8fEdT3VejTb926caR0o; Path=/");
  expect(response.text).toBe("Hello Edy");
});
```

19. Response Body Lainnya

Sebelumnya, kita sudah mencoba beberapa jenis Response Body di ExpressJS
Kita bisa menggunakan `res.send(data)` untuk mengirim response berupa text misal nya, atau sebelumnya, kita sudah menggunakan `res.json(object)` untuk mengirim data dalam bentuk JSON
Sebenarnya masih banyak jenis Response Body yang didukung oleh ExpressJS

- res.send(data) Response berupa raw data
- res.download(path, filename, option) Response berupa file download
- res.json(body) Response berupa JSON
- res.redirect(url) Response redirect url
- res.sendFile(path, option) Response berupa file

```
import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
  // langsung sind file ke browser
  res.sendFile(__dirname + "/contoh.txt");
});

test("Test Response Send File", async () => {
  const response = await request(app).get("/");
  expect(response.text).toContain("This is sample text");
});
```

20. Error Handling

Apa yang terjadi jika misal terjadi Error di aplikasi kita? Secara otomatis Error tersebut akan ditangkap oleh ExpressJS
Lalu detail error nya akan ditampilkan di response-nya secara otomatis
Kadang, ada kasus kita ingin mengubah cara menampilkan error, atau bahkan kita memang berharap terjadi error, misal Validation Error
Pada kasus seperti ini, untungnya ExpressJS memiliki fitur Error-Handling Middleware, dimana kita bisa membuat Middleware dan akan dieksekusi ketika terjadi error
Berbeda dengan Middleware biasanya, pada Error-Handling Middleware, diperlukan empat parameter, dimana diawali dengan parameter error nya

```
//error-handling.test.js
import express from "express";
import request from "supertest";

const app = express();

const errorMiddleware = (err, req, res, next) => {
  // yang tampil saat terjadi error
  res.status(500).send(`Terjadi Error: ${err.message}`);
};

app.get('/', (req, res) => {
  throw new Error("Ups");
});
app.use(errorMiddleware); //tempatkan posisi paling bawah

test("Test Response", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Terjadi Error: Ups");
});

```

21. Static File

Saat membuat Web, kadang kita ingin menampilkan static file seperti html, css, javascript, gambar, atau file lainnya
Jika kita harus membuat route untuk setiap file, maka akan menyulitkan.
Untungnya, terdapat middleware yang bisa kita gunakan untuk menyediakan static file.
Middleware ini secara otomatis akan mencari file, jika file ada, maka akan dikembalikan file tersebut, jika tidak ada, maka akan dilanjutkan ke middleware atau route selanjutnya
Kita bisa menggunakan Middleware `express.static()`

- Prefix Path

Kadang-kadang, kita ingin memberi prefix path pada static file, misal /static/filenya
Pada kasus itu, maka kita bisa tambahkan route pada middleware nya, misal :
app.use(‘/static’, express.static(...))

22. Template Engine

Saat membuat web menggunakan ExpressJS, maka jika kita membuat string HTML lalu kita kirim menggunakan response, maka hal itu sangat menyulitkan
Biasanya, untuk mempermudah itu, kita bisa menggunakan Template Engine
Template Engine adalah library yang digunakan untuk membuat template lalu mempermudah kita ketika ingin menampilkan data di template nya
Biasanya template nya dalam bentuk HTML, dan data nya bisa kita ubah sesuai dengan data yang ingin kita tampilkan di HTML tersebut

Pada kelas ini, kita akan menggunakan Mustache sebagai template engine
Hal ini dikarenakan Mustache merupakan template engine yang sangat mudah digunakan
Kita tidak akan menginstall Mustache secara manual, kita akan menggunakan bantuan library Mustache Express

22. File Upload

Sebelumnya kita belum membahas bagaimana jika Request Body yang dikirim adalah File Upload atau Multipart Form Data?
Sayangnya, secara default di ExpressJS, tidak ada fitur untuk membaca File Upload
Tapi kita bisa menggunakan Third-Party Middleware lain untuk membaca File Upload

23. Not Found Error

Saat user melakukan request ke URL yang tidak tersedia, maka secara default ExpressJS akan mengembalikan halaman 404
Kadang ada kasus dimana kita ingin membuat halaman 404 sendiri
Pada kasus ini, kita bisa menambahkan middleware di posisi paling akhir
Middleware tersebut akan dipanggil jika memang tidak terdapat route yang tersedia untuk route path yang diakses
