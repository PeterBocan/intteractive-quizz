const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3333;
const magicToken = "something";

app.use(bodyParser.json());

app.get('/', (req, res) => res.send(fs.readFileSync('./question.json')));
app.post('/', (req, res) => {
    if (req.body.magicToken !== magicToken) {
        res.send(JSON.stringify({ status: "Not permitted."} ));
        return;
    }
    delete req.body.magicToken;
    fs.writeFileSync("./question.json", JSON.stringify(req.body));
    res.send(JSON.stringify({ status: "ok" }));
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));


