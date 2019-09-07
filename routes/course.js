var express = require("express");
var router = express.Router();
const Sqlizer = require("node-sqlizer");

var mysql = require("mysql");

router.get("/", (req, res) => {
  res.send("course root.");
});

router.get("/all", (req, res) => {
  let allCourseQuery = Sqlizer.getSql({ table: "course" });
  let allTestQuery = Sqlizer.getSql({ table: "test" });

  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
  connection.connect();
  connection.query(allCourseQuery, (error, courses, fields) => {
    if (error) throw error;
    console.log("courses: ", courses);
    connection.query(allTestQuery, (error, tests, fields) => {
      if (error) throw error;
      console.log("tests: ", tests);
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
