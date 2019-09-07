import React from "react";
import Paper from "@material-ui/core/Paper";
import "./Course.css";
import { Grid, Fab, IconButton, Modal, Typography } from "@material-ui/core";
import Test from "../Test/Test";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import CreateTest from "../CreateTest/CreateTest";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openAddTest: false };
  }

  onCourseDelete = () => {
    const { course } = this.props;
    axios
      .post("/api/course/delete", {
        id: course.id
      })
      .then(res => {
        console.log("delete course resp:", res);
        window.location.reload();
      });
  };

  handleAddTestClose = () => {
    this.setState({ openAddTest: false });
  };

  handleAddTestOpen = () => {
    this.setState({ openAddTest: true });
  };

  onDBSave = () => {
    this.setState({ openAddTest: false });
    window.location.reload();
  };

  getTestHeader = showHeader => {
    let withHead = (
      <Grid container spacing={0} alignItems="flex-end">
        <Grid item xs={6}>
          <b>
            <i>Test name </i>
          </b>
        </Grid>
        <Grid item xs={2}>
          <i>Number of questions</i>
        </Grid>
        <Grid item xs={2}>
          <i>Duration</i>
        </Grid>
        <Grid item xs={2}>
          <Fab
            size="small"
            color="primary"
            title="Add a test"
            onClick={this.handleAddTestOpen}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    );
    let withoutHead = (
      <Grid container spacing={0} alignItems="flex-end">
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Fab
            size="small"
            color="primary"
            title="Add a test"
            onClick={this.handleAddTestOpen}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    );
    if (showHeader === true) return withHead;
    return withoutHead;
  };

  render() {
    const { course } = this.props;

    return (
      <Paper className="course-outer">
        <Modal open={this.state.openAddTest} onClose={this.handleAddTestClose}>
          <CreateTest onDBSave={this.onDBSave} courseid={course.id} />
        </Modal>
        {/* course info container */}
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <Typography variant="subtitle1" className="course-field-title">
              Course ID
            </Typography>
            <Typography variant="subtitle2">{course.id}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" className="course-field-title">
              Domain
            </Typography>
            <Typography variant="subtitle2">{course.domain}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" className="course-field-title">
              Name
            </Typography>
            <Typography variant="subtitle2">{course.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" className="course-field-title">
              Description
            </Typography>
            <Typography variant="subtitle2">{course.description}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton title="Delete Course" onClick={this.onCourseDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          {/* display test grid */}
          <Grid container spacing={0} className="course-test-container">
            {this.getTestHeader(course.tests.length > 0)}
            <Grid item xs={12}>
              {course.tests && course.tests.map(test => <Test test={test} />)}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Course;
