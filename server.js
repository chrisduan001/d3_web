/**
 * Created with template on 1/23/18.
 */
const express = require('express');
const path = require('path');
const port = process.env.PORT || 1337;
const app = express();
const https = require("https");
const fs = require("fs");

app.use(express.static(__dirname));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

const options = {
    key: fs.readFileSync("./certificate/polygradient.key"),
    cert: fs.readFileSync("./certificate/polygradient.crt"),
    ca: fs.readFileSync("./certificate/polygradient.ca_bundle")
};

const server = https.createServer(options, app);

server.listen(port);
