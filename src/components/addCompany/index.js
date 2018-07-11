import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";

export default class AddCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
      };
      this.submit.bind(this);
  }
  submit() {
    fetch("http://localhost:3001/companies", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title:this.state.title
      })
    })
      .then(response => {
        if (response.ok) {
          this.props.history.goBack();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div style={{ maxWidth: 700, margin: "auto" }}>
        <h1>Add company</h1>
        <FormGroup style={{ textAlign: "left" }}>
          <Label>Title</Label>
          <Input
            placeholder="Enter company's name"
            value={this.state.title}
            onKeyPress={(e)=>{
              if(e.key==='Enter'){
                this.submit();
              }
            }}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </FormGroup>
        <Button color="success" onClick={this.submit.bind(this)}>Add</Button>
      </div>
    );
  }
}
