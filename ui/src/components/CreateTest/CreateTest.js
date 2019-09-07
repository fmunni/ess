import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./CreateTest.css";
import axios from "axios";

class CreateTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", nquestion: "0", duration: "0" };
  }
  handleChange = e => {
    let id = e.target.id;
    let val = e.target.value;
    this.setState({ [id]: val });
  };

  onSave = () => {
    axios
      .post("/api/test/create", {
        name: this.state.name,
        nquestion: this.state.nquestion,
        duration: this.state.duration,
        course_id: this.props.courseid
      })
      .then(res => {
        console.log("create test resp:", res);
        this.props.onDBSave();
      });
  };

  render() {
    return (
      <div className="create-test">
        <h3> Create a new test </h3>
        <form noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
          />

          <TextField
            id="nquestion"
            label="Num of questions"
            value={this.state.nquestion}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            id="duration"
            label="Duration"
            value={this.state.duration}
            onChange={this.handleChange}
            margin="normal"
          />

          <Button color="primary" variant="contained" onClick={this.onSave}>
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default CreateTest;
