/**
 * Created with template on 1/23/18.
 */
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();
const http = require("http");

app.use(express.static(__dirname));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

const server = http.createServer(app);

server.listen(port);