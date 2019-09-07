import React from "react";
import "./Home.css";
import axios from "axios";
import { Grid, InputBase, Modal } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import Course from "../Course/Course";

import CreateCourse from "../CreateCourse/CreateCourse";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      openAddCourse: false,
      keyword: ""
    };
  }

  componentDidMount() {
    axios.get("/api/course/all").then(res => {
      console.log("data:", res);
      this.setState({ courses: res.data });
    });
  }

  handleAddCourseOpen = () => {
    this.setState({ openAddCourse: true });
  };

  handleAddCourseClose = () => {
    this.setState({ openAddCourse: false });
  };

  onDBSave = () => {
    this.handleAddCourseClose();
    window.location.reload();
  };

  handleSearch = e => {
    this.setState({ keyword: e.target.value.toLowerCase() });
  };

  getFilteredCourses = () => {
    const { keyword, courses } = this.state;

    return courses.filter(c => {
      const filteredTests = c.tests.filter(t =>
        t.name.toLowerCase().includes(keyword)
      );
      return (
        c.name.toLowerCase().includes(keyword) ||
        c.id.toString() === keyword ||
        filteredTests.length > 0
      );
    });
  };

  render() {
    const { openAddCourse } = this.state;
    const courses = this.getFilteredCourses();
    return (
      <div className="App">
        <h1> Course and Test Management </h1>
        <Modal open={openAddCourse} onClose={this.handleAddCourseClose}>
          <CreateCourse onDBSave={this.onDBSave} />
        </Modal>

        <Grid container justify="flex-end" spacing={0}>
          <Grid item xs={4}>
            <Typography variant="button" display="block" gutterBottom>
              List of courses
            </Typography>
            {/* <div className="list-of-course-heading">List of Courses</div> */}
          </Grid>
          <Grid item xs={4}>
            <InputBase
              placeholder="Search"
              className="search-field"
              onChange={this.handleSearch}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={this.handleAddCourseOpen}
            >
              Add a course
            </Button>
          </Grid>
        </Grid>

        <div className="list-of-courses">
          {courses.map(course => {
            return <Course course={course} />;
          })}
        </div>
      </div>
    );
  }
}

export default Home;
