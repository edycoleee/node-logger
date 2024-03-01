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

const requestTimeMiddleware = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

export const app = express();

app.use(logger);
app.use(addPoweredHeader);
app.use(apiKeyMiddleware);
app.use(requestTimeMiddleware);


app.get('/', (req, res) => {
    res.send("Hello Response");
});

app.get('/mid1', (req, res) => {
    res.send("Hello Middleware2");
});

app.get('/mid3', (req, res) => {
    res.send("Hello Middleware3");
});

app.get('/time', (req, res) => {
    res.send(`Hello , Today Is ${req.requestTime}`);
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

app.get('/req-par', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
    console.log(req.query)
})

app.get('/req-head1', (req, res) => {
    const type = req.get("accept");
    res.send(`Hello ${type}`);
});

app.get('/req-head2', (req, res) => {
    const value_header = req.headers["custom-header"];
    res.send(`Hello ${value_header}`);
});

app.get('/helo', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

app.get('/resp', (req, res) => {
    res.send(`Hello Response`);
});

app.get('/resp-status', (req, res) => {
    if(req.query.name){
        res.status(200);
        res.send(`Hello ${req.query.name}`);
    }else{
        res.status(400);
        res.end();
    }
});

app.get('/resp-header', (req, res) => {
    res.set({
        "X-Powered-By": "Coding Cupu",
        "X-Author": "Edy"
    });
    res.send(`Hello Response`);
});

app.get('/resp-body', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(`<html><body>Hello World</body></html>`);
});

app.get('/resp-redir', (req, res) => {
    res.redirect('/to-next-page');
});


//app.listen(3000, () => {
//    console.info("Server started on port 3000");
//});