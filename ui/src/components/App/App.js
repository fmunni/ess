import React from "react";
import "./App.css";
import axios from "axios";
import { Grid, InputBase, IconButton } from "@material-ui/core";
import { Paper, Button, Fab } from "@material-ui/core";
import Course from "../Course/Course";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { courses: [] };
  }

  componentDidMount() {
    axios.get("/api/course/all").then(res => {
      console.log("data:", res);
      this.setState({ courses: res.data });
    });
  }

  render() {
    const { courses } = this.state;
    return (
      <div className="App">
        <h1> eSS </h1>
        <Grid container justify="flex-end" spacing={0}>
          <Grid item xs={4}>
            <div className="list-of-course-heading">List of Courses</div>
          </Grid>
          <Grid item xs={4}>
            <InputBase placeholder="Search" className="search-field" />
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Button color="primary" variant="outlined">
              Add Course
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

export default App;
