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