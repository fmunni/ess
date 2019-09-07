import React from "react";
import Paper from "@material-ui/core/Paper";
import "./Course.css";
import { Grid, Button, Fab } from "@material-ui/core";
import Test from "../Test/Test";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

class Course extends React.Component {
  render() {
    const { course } = this.props;

    return (
      <Paper className="course-outer">
        <Grid container spacing={0}>
          <Grid item xs={11}>
            <p>
              <b>Name:</b>
              {course.name}
            </p>
            <p>
              <b>Description:</b>
              {course.description}
            </p>
            <p>
              <b>Domain:</b> {course.domain}
            </p>
          </Grid>
          <Grid item xs={1}>
            <Fab size="small" color="secondary">
              <DeleteIcon />
            </Fab>
          </Grid>

          <Grid item xs={9}>
            <b>
              <i>Associated Tests: </i>
            </b>
          </Grid>
          <Grid item xs={3}>
            <Fab size="small" color="primary" title="Add a test">
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={12}>
            {course.tests && course.tests.map(test => <Test test={test} />)}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Course;
