import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";

export default class EditServer extends Component {
  constructor(props) {
    super(props);
    let company = this.props.companies.map(company => {
      company.label = company.title;
      company.value = company.id;
      return company;
    }).find((item)=>item.id.toString()===this.props.match.params.companyID.toString());
    if(company===undefined){
      company=this.props.companies.map(company => {
        company.label = company.title;
        company.value = company.id;
        return company;
      })[0];
    }
    this.state = {
      host: this.props.server.host,
      company: this.props.companies.map(company => {
        company.label = company.title;
        company.value = company.id;
        return company;
      }).find((item)=>item.id===this.props.server.company.id)
      };
      this.submit.bind(this);
      this.deleteServer.bind(this);
  }
  submit() {
    fetch("http://localhost:3001/servers/"+this.props.server.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        host:this.state.host,
        company:{
          id:this.state.company.id,
          title:this.state.company.title
        }
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

  deleteServer(){
    if (window.confirm('Are you sure you want to delete this Server?')) {
      fetch("http://localhost:3001/servers/"+this.props.server.id, {
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
        <h1>Edit server</h1>
        <FormGroup style={{ textAlign: "left" }}>
          <Label>Host name</Label>
          <Input
            placeholder="Enter host name"
            value={this.state.host}
            onChange={e => this.setState({ host: e.target.value })}
          />
        </FormGroup>
        <FormGroup style={{ textAlign: "left" }}>
          <Label>Company</Label>
          <Select
            placeholder="Company"
            value={this.state.company}
            options={this.props.companies.map(company => {
              company.label = company.title;
              company.value = company.id;
              return company;
            })}
            onChange={e => this.setState({ company: e })}
          />
        </FormGroup>
        <Button color="danger" onClick={this.deleteServer.bind(this)}>
          Delete
        </Button>
        <Button color="success" style={{marginLeft:10 }} onClick={this.submit.bind(this)}>Save</Button>
      </div>
    );
  }
}
