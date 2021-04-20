const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set("view engine", "ejs");

app.get("/person/:name", (req, res) => {
    res.render("person", { name: req.params.name, })
});


app.post("/person", function (req, res) {
    testo(req,res)
    console.log(req.body)
});

app.post("/person2", function (req, res) {
    res.send(req.body);
    console.log(req.body)
});

function testo(req, res) {
    res.send(req.body);
}

app.listen(port, () => console.log(`Example app listening on port port!`))