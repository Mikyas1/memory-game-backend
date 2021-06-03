const express = require("express");
const bodyParser = require('body-parser');

const routres = require("./routers/router");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", routres);

app.listen("8080");