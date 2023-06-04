const express = require('express');
const path = require('path');

const app = express();

app.use("/", express.static(path.join(__dirname), { extensions: ["html"] }));

app.get("/", (_req, res) => res.sendFile(path.join(__dirname, 'ponySolver.html')));

const port = 8081;

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});