import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./CreateCourse.css";
import axios from "axios";

class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", domain: "", description: "" };
  }
  handleChange = e => {
    let id = e.target.id;
    let val = e.target.value;
    this.setState({ [id]: val });
  };

  onSave = () => {
    axios
      .post("/api/course/create", {
        ...this.state
      })
      .then(res => {
        console.log("create resp:", res);
        this.props.onDBSave();
      });
  };

  render() {
    return (
      <div className="create-course">
        <h3> Create a new course </h3>
        <form noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
          />

          <TextField
            id="domain"
            label="Domain"
            value={this.state.domain}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            id="description"
            label="Description"
            value={this.state.description}
            onChange={this.handleChange}
            margin="normal"
            multiline
            fullWidth
          />
          <Button color="primary" variant="contained" onClick={this.onSave}>
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default CreateCourse;
