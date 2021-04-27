const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/soko', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
    .once('open', () => console.log("connection opened successfully"))
    .on("error", (err) => console.error(err));
