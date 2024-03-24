## Belajar Node REST API

- https://docs.google.com/presentation/d/1OP6J1tIBHFB9eq3T6g7a7oO4f8hnU9qhOQH1LGJPtjM/edit?usp=sharing
- https://github.com/ProgrammerZamanNow/belajar-nodejs-restful-api

### 1. Persiapan

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

//create directory
mkdir node-logger && cd node-logger

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

### 2. Requirement

RESTful API yang akan kita buat memiliki fitur sebagai berikut :

- User Management

UserData : Username, Password, Name

UserAPI : Register User, Login User, Update User, Get User, Logout User

- Contact Management

Contact Data : First Name, Last Name, Email, Phone

Contact API : Create Contact, Update Contact, Get Contact, Search Contact, Remove Contact

- Address Management

Contact Address Data: Street, City, Province, Country, Postal Code

Address API: Create Address, Update Address, Get Address, List Address, Remove Address

### 3. Memulai Project

Buat folder belajar-nodejs-restful-api `npm init`. Buka package.json, dan tambah type module.

```
npm install joi
npm install express
npm install --save-dev @types/express
npm install --save-dev prisma
npm install winston
npm install bcrypt
npm install --save-dev @types/bcrypt
npm install uuid
npm install --save-dev @types/uuid
npm install --save-dev jest @types/jest
npm install --save-dev babel-jest @babel/preset-env
npm install --save-dev supertest @types/supertest
```

package.json

```
  "scripts": {
    "test": "jest -i"
  },
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  },
  "type": "module",
```

babel.config.json

```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

### 4. Membuat API Specs

- docs/user.md

```
Register User API   : POST /api/users
Login User API      : POST /api/users/login
Update User API     : PATCH /api/users/current
Get User API        : GET /api/users/current
Logout User API     : DELETE /api/users/logout
```

- docs/contact.md

```
Create Contact API : POST /api/contacts
Update Contact API : PUT /api/contacts/:id
Get Contact API    : GET /api/contacts/:id
Search Contact API : GET /api/contacts
Remove Contact API : DELETE /api/contacts/:id
```

- docs/address.md

```
Create Address API : POST /api/contacts/:contactId/addresses
Update Address API : PUT /api/contacts/:contactId/addresses/:addressId
Get Address API    : GET /api/contacts/:contactId/addresses/:addressId
List Addresses API : GET /api/contacts/:contactId/addresses
Remove Address API : DELETE /api/contacts/:contactId/addresses/:addressId
```

### 5. Setup Database Menggunakan ORM Prisma

buka mysql

`npx prisma init`

### 5. Setup dengan MYSQL tanpa ORM

- Membuat database / Schema dbsiswa

```
CREATE DATABASE `dbsiswa`
```

- Membuat table user

```
USE dbsiswa

CREATE TABLE `users` (
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

INSERT INTO users(username,password,name)
VALUES
('silmi','silmi1','silmi'),
('afin','afin1','afin'),
('edy','edy1','edy'),
('tutik','tutik1','tutik')

```

- Koneksi ke database

```
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=760410
DB_NAME=dbsiswa
DB_PORT=3306
```

### 6. Setup NODE Project

- install depencies >> semua library yang dibutuhkan
  `npm install winston winston-transport express joi uuid bcrypt`
  `npm install --save-dev nodemon`

- update package.json

```
//package.json >> jalankan dev / production(start)
  ....
  "scripts": {
    "test": "jest",
    "start": "node ./src/index.js",
    "dev": "nodemon ./src/index.js"
  },

```

- buat file //src/index.js >> file utama yang dijalankan saat server

```
//src/index.js
import { logger } from "./application/logging.js";
import { app } from "./application/web.js";


// Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
```

- buat file //src/application/web.js >> bagian dari index.js

```
//src/application/web.js

import express from "express";
import { logger } from "./logging.js";

export const app = express();

app.use(express.json());

// Middleware untuk logging permintaan
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middleware untuk menangkap kesalahan
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});
```

- Buat File //src/application/logging.js >> logging yang ditampilkan console

```
//src/application/logging.js

import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({})
    //new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

- untuk jalankan dev `npm run dev` , sedangkan jika prod `npm run start`

### 7. Testing Awal

`npm install jest supertest @types/jest --save-dev`

- membuat router public (bisa diakses tanpa password)

```
//src/route/public-api/js
import express from "express";
import { logger } from "../application/logging.js";

const publicRouter = new express.Router();

// User API

// Endpoint untuk contoh API
publicRouter.get('/', (req, res) => {
  logger.info('Hello World requested');
  res.send('Hello World!');
});


export {
  publicRouter
}
```

- daftarkan pada web.js

```
//src/application/web.js

import express from "express";
import { logger } from "./logging.js";
import { publicRouter } from "../route/public-api.js";

export const app = express();

app.use(express.json());

// Middleware untuk logging permintaan
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middleware untuk menangkap kesalahan
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(publicRouter);
```

- buat unit test //test/app.test.js

```
const request = require('supertest');
const { app } = require('../src/application/web');


describe('GET /', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
```

- jalankan test dengan `npx jest app.test.js`

### 8. Setup Database Menggunakan Library MYSQL2 >> GET

`npm install mysql2`

- konfigurasi mysql

```
//src/application/config.js

export const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "760410",
    database: "dbsiswa",
    connectTimeout: 60000
  },
  listPerPage: 10,
};

```

```
//src/service/db.js
import mysql from "mysql2/promise";
import { config } from "../application/config.js";

export async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results,] = await connection.execute(sql, params);
  await connection.end();
  return results;
}

```

```
//src/services/programmingLanguages.js

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank
    FROM programming_languages LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}

```

- membuat routing sederhana GET /api/users >> menampilkan semua users

```
//src/route/public-api/js
import express from "express";
import { logger } from "../application/logging.js";
import { query } from "../service/db.js";


const publicRouter = new express.Router();

// publicRouter.get('/ping', healthController.ping);

// Endpoint untuk contoh API
publicRouter.get('/', (req, res) => {
  logger.info('Hello World requested');
  res.send('Hello World!');
});

// User API
publicRouter.get('/api/users', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM users')
    //console.log(rows);
    res.status(200).json(rows)
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }

});

export {
  publicRouter
}
```

- menjalankan unit test

```
//test/app.test.js
const request = require('supertest');
const { app } = require('../src/application/web');


describe('GET /', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});

describe('GET /api/users', () => {
  it('should return data from MySQL', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});
```

### 9. POST NEW DATA

- membuat routing post

```
//src/route/public-api/js
import express from "express";
import { logger } from "../application/logging.js";
import { query } from "../service/db.js";

const publicRouter = new express.Router();


// Endpoint untuk contoh API
publicRouter.get('/', (req, res) => {
  logger.info('Hello World requested');
  res.send('Hello World!');
});

// Users API
//GET ALL DATA
publicRouter.get('/api/users', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM users')
    //console.log(rows);
    logger.info(`GET DATA: ${rows}`);
    res.status(200).json(rows)
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }

});

//POST NEW DATA
publicRouter.post('/api/users', async (req, res) => {
  try {
    const { username, password, name } = req.body;
    await query('INSERT INTO users (username,password,name) VALUES (?, ?, ?)', [username, password, name]);
    const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
    logger.info(`POST NEW DATA: ${JSON.stringify(rows)}`);
    res.status(201).send('Data inserted successfully');
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

export {
  publicRouter
}
```

- pada testing insert data harus di lakukan delete untuk menghilangkan datany

```
//test/test-util.js

import { logger } from "../src/application/logging";
import { query } from "../src/service/db";

export const removeTestUser = async (username) => {
  await query('DELETE FROM users WHERE username = ?', [username]);
  const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
  logger.info(`DELETE NEW DATA: ${JSON.stringify(rows)}`);
}
```

- testing POST NEW DATA

```
//test/app.test.js
const request = require('supertest');
const { app } = require('../src/application/web');
const { removeTestUser } = require('./test-util');


describe('POST /api/users', () => {
  const USERNAME = 'john'
  //menghapus data setelah test insert
  afterEach(async () => {
    await removeTestUser(USERNAME);
  })

  it('should add new data to MySQL', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ username: USERNAME, password: 'john1', name: 'john' });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Data inserted successfully');
  });
});
```

### 9. POST NEW DATA IMPLEMENTASI VALIDATION DENGAN JOI

`npm install joy`

- implementasi pada post

```
// Skema validasi POST NEW DATA users menggunakan Joi
const schemaPostUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});


//POST NEW DATA
publicRouter.post('/api/users', async (req, res) => {
  try {

    // Validasi data masukan
    const { error } = schemaPostUser.validate(req.body);
    if (error) {
      logger.error(`Validation Error: ${error.message}`);
      return res.status(400).send(error.details[0].message);
    }

    // Data valid, lanjutkan proses
    const { username, password, name } = req.body;
    await query('INSERT INTO users (username,password,name) VALUES (?, ?, ?)', [username, password, name]);
    const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
    logger.info(`POST NEW DATA: ${JSON.stringify(rows)}`);
    res.status(201).send('Data inserted successfully');
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});
```

- test validasi

```
describe('POST /api/users', () => {
  const USERNAME = 'john'
  //menghapus data setelah test insert
  afterEach(async () => {
    await removeTestUser(USERNAME);
  })

  it('should add new data to MySQL', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ username: USERNAME, password: 'john1', name: 'john' });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Data inserted successfully');
  });

  it('should reject if request is not valid', async () => {
    const invalidData = { username: 'John' }; // Missing 'name, password' field
    const response = await request(app)
      .post('/api/users')
      .send(invalidData);
    expect(response.status).toBe(400);
    //expect(response.body.errors).toBeDefined();
  });
});
```

### 10. DELETE DATA
