const express = require('express');

const app = express();
const app2 = express();


app.get("/", (req, res) => {
    for (let i = 0; i < 99999999999; i++) {

    }
    res.send("end");
});

app2.get("/test", (req, res) => {
    res.send("end app2");
});

app.listen(4000, () => {
    console.log(`Server started on port 4000`);
});

app2.listen(5000, () => {
    console.log(`Server started on port 5000`);
});
