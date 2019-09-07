const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "ui/build")));
app.use("/api/course", require("./routes/course"));
app.use("/api/test", require("./routes/test"));

app.get("/", (req, res) => res.send("HomePage ess."));

app.listen(port, () => console.log(`ess app is listening on port ${port}!`));
