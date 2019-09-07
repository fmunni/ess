var express = require("express");
var router = express.Router();

var mysql = require("mysql");

const getDBConn = () => {
  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
  connection.connect();
  return connection;
};

router.get("/", (req, res) => {
  res.send("course root.");
});

router.post("/delete", (req, res) => {
  let query = `DELETE FROM course WHERE id = ${req.body.id}`;
  console.log("delete query:", query);
  const connection = getDBConn();

  connection.query(query, (error, result, fields) => {
    if (error) {
      console.log(error);
      res.send({ status: "FAILED" });
      return;
    }
    console.log("delete course:", result);
    connection.end();
    res.send({ success: "OK" });
  });
});

router.post("/create", (req, res) => {
  let query = `INSERT INTO course ( name, domain, description )
  VALUES ( "${req.body.name}", "${req.body.domain}","${req.body.description}" )`;

  const connection = getDBConn();
  connection.query(query, (error, result, fields) => {
    if (error) {
      console.log(error);
      res.send({ status: "FAILED" });
      return;
    }
    console.log("create DB result", result);
    connection.end();
    res.send({ success: "OK" });
  });
});

router.get("/all", (req, res) => {
  let allCourseQuery = "SELECT * FROM course";
  let allTestQuery = "SELECT * FROM test";
  const connection = getDBConn();

  connection.query(allCourseQuery, (error, courses, fields) => {
    if (error) {
      console.log(error);
      res.send({ status: "FAILED" });
      return;
    }
    //console.log("courses: ", courses);
    connection.query(allTestQuery, (error, tests, fields) => {
      if (error) {
        console.log(error);
        res.send({ status: "FAILED" });
        return;
      }
      //console.log("tests: ", tests);
      connection.end();
      courses.forEach(c => {
        const testsUnderCourse = tests.filter(t => t.course_id === c.id);
        c.tests = testsUnderCourse;
      });
      res.send(courses);
    });
  });
});

module.exports = router;
