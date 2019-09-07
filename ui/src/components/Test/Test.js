import React from "react";
import Paper from "@material-ui/core/Paper";
import "./Test.css";
import { Grid, Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";

class Test extends React.Component {
  render() {
    const { test } = this.props;

    return (
      <Paper className="test">
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <div>
              <b>Name: </b> {test.name}
            </div>
            <div>
              <b>Number of questions:</b> {test.num_of_questions}
            </div>
            <div>
              <b>Duration:</b> {test.duration} minutes
            </div>
          </Grid>

          <Grid item xs={3}>
            <IconButton title="Delete test">
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Test;
