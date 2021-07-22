const express = require('express');

const app = express();

let name = "No Name";

app.get("/",(req,res)=>{
    if(req.query.name){
        name = req.query.name;
    }

    res.send(name);
});

app.listen(4000, () => {
    console.log(`Server started on port`);
});