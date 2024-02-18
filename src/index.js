import express from "express";

export const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/edy', (req, res) => {
    res.send("Hello Edy");
});

app.get('/req-http', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});

app.get('/req-url/world', (req, res) => {
    res.json({
        path: req.path,
        originalUrl: req.originalUrl,
        hostname: req.hostname,
        protocol: req.protocol,
        secure: req.secure,
    })
});


app.get('/helo', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});


//app.listen(3000, () => {
//    console.info("Server started on port 3000");
//});