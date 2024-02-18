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