const express = require('express');
const path = require('path');

const app = express();

app.use("/", express.static(path.join(__dirname, "dist"), { extensions: ["html"] }));

app.get("/", (_req, res) => res.sendFile(path.join(__dirname, 'dist/ponySolver.html')));

app.listen(8081);