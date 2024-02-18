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

5. Request Query Param

6. Request Header

7. Response

8. Response Status


9. 

