import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";

export default class EditServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.company.title
      };
      this.submit.bind(this);
      this.deleteCompany.bind(this);
  }

  submit() {
    fetch("http://localhost:3001/companies/"+this.props.company.id, {
      method: "PUT",
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

  deleteCompany(){
    if (window.confirm('Are you sure you want to delete this company?')) {
      fetch("http://localhost:3001/companies/"+this.props.company.id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            this.props.history.goBack();
          } else {
            throw new Error("Something went wrong ...");
          }
        })
        .catch(error => console.log(error));
		} else {
			return;
		}
  }

  render() {
    return (
      <div style={{ maxWidth: 700, margin: "auto" }}>
        <h1>Edit company</h1>
        <FormGroup style={{ textAlign: "left" }}>
          <Label>Title</Label>
          <Input
            placeholder="Enter company name"
            value={this.state.title}
            onKeyPress={(e)=>{
              if(e.key==='Enter'){
                this.submit();
              }
            }}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </FormGroup>
        <Button color="danger" onClick={this.deleteCompany.bind(this)}>
          Delete
        </Button>
        <Button color="success" style={{marginLeft:10 }} onClick={this.submit.bind(this)}>Save</Button>
      </div>
    );
  }
}
