var express = require("express");
var router = express.Router();

var mysql = require("mysql");

const getDBConn = () => {
  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
  connection.connect();
  return connection;
};

router.post("/create", (req, res) => {
  let query = `INSERT INTO test ( course_id, num_of_questions, name, duration )
  VALUES ( ${req.body.course_id}, ${req.body.nquestion},"${req.body.name}",  "${req.body.duration}")`;
  console.log("create test:", query);

  const connection = getDBConn();
  connection.query(query, (error, result, fields) => {
    if (error) {
      console.log(error);
      res.send({ status: "FAILED" });
      return;
    }
    console.log("create test:", result);
    connection.end();
    res.send({ success: "OK" });
  });
});

router.post("/delete", (req, res) => {
  let query = `DELETE FROM test WHERE id = ${req.body.id}`;
  console.log("delete query:", query);
  const connection = getDBConn();

  connection.query(query, (error, result, fields) => {
    if (error) {
      console.log(error);
      res.send({ status: "FAILED" });
      return;
    }
    console.log("delete test:", result);
    connection.end();
    res.send({ status: "OK" });
  });
});

router.get("/", (req, res) => {
  res.send("test root.");
});

module.exports = router;
