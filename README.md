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
import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

//http://localhost:3000/user?firstName=Edy&lastName=Cole

test("Test Query Parameter", async () => {
    const response = await request(app)
        .get("/")
        .query({ firstName: "Edy" , lastName: "Cole"});
    expect(response.text).toBe("Hello Eko Khannedy");
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

9. Response Status


9. 

