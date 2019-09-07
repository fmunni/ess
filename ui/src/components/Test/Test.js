import React from "react";
import Paper from "@material-ui/core/Paper";
import "./Test.css";
import { Grid, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

class Test extends React.Component {
  onDelete = () => {
    axios
      .post("/api/test/delete", {
        id: this.props.test.id
      })
      .then(res => {
        console.log("delete test resp:", res);
        window.location.reload();
      });
  };
  render() {
    const { test } = this.props;

    return (
      <Paper className="test">
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={6}>
            {test.name}
          </Grid>
          <Grid item xs={2}>
            {test.num_of_questions}
          </Grid>
          <Grid item xs={2}>
            {test.duration} minutes
          </Grid>

          <Grid item xs={2}>
            <IconButton title="Delete test" onClick={this.onDelete}>
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
