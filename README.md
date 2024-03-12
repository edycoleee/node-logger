## Belajar Node REST API

- https://docs.google.com/presentation/d/1OP6J1tIBHFB9eq3T6g7a7oO4f8hnU9qhOQH1LGJPtjM/edit?usp=sharing
- https://github.com/ProgrammerZamanNow/belajar-nodejs-restful-api

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

2. Requirement

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

3. Memulai Project

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
4. Membuat API Specs

- docs/user.md
```
Register User API   : POST /api/users 
Login User API      : POST /api/users/login
```
- docs/contact.md


- docs/address.md




