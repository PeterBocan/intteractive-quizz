const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const magicToken = "saveSomething";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.get('/question', (req, res) => {
    res.json(fs.readFileSync('./question.json'));
});

app.post('/question', (req, res) => {
    if (req.query.token !== magicToken) {
        res.json({ status: "Not permitted."});
        return;
    }
    fs.writeFileSync("./question.json", JSON.stringify(req.body));
    res.json({ status: "ok" });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
