const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 8080;
const magicToken = "saveSomething";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(fs.readFileSync('./question.json'));
});

app.post('/', (req, res) => {
    if (req.query.token !== magicToken) {
        res.json({ status: "Not permitted."});
        return;
    }
    console.log(req.body);
    fs.writeFileSync("./question.json", JSON.stringify(req.body));
    res.json({ status: "ok" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
