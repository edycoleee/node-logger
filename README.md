## Belajar Node Logging 

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

Routing merupakan teknik yang digunakan untuk meneruskan request dari URL Path ke callback yang kita tuju
Routing di ExpressJS bisa menggunakan object Application, dan menggunakan method sesuai dengan nama HTTP Method nya


app.connect(path, callback)
app.get(path, callback)
app.post(path, callback)
app.put(path, callback)
app.delete(path, callback)

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

Supertest adalah salah satu library yang bisa digunakan untuk membantu melakukan pengetesan web ExpressJS

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
Response merupakan object representasi dari HTTP Response
Kita bisa mengubah data HTTP Response melalui object Response tersebut

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
C. Contoh 2 Middlware Api Key Middleware

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
    e
```

D. 

13. 