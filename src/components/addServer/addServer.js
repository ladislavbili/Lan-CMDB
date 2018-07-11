import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";

export default class AddServer extends Component {
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
      host: "",
      company
      };
      this.submit.bind(this);
  }
  submit() {
    fetch("http://localhost:3001/servers", {
      method: "POST",
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

  render() {
    return (
      <div style={{ maxWidth: 700, margin: "auto" }}>
        <h1>Add server</h1>
        <FormGroup style={{ textAlign: "left" }}>
          <Label>Host name</Label>
          <Input
            placeholder="Enter host name"
            value={this.state.host}
            onKeyPress={(e)=>{
              if(e.key==='Enter'){
                this.submit();
              }
            }}
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

        <Button color="success" onClick={this.submit.bind(this)}>Save</Button>
      </div>
    );
  }
}
