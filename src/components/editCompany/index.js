import React, { Component } from "react";
import EditCompany from "./editCompany";

export default class EditServerLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      company:null,
      companyLoaded:false,
      server: null,
      serverLoaded:false,
    }
  }
  componentWillMount() {
    fetch("http://localhost:3001/companies/"+this.props.match.params.id, { method: "GET" })
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(decodedResponse => {
              this.setState({companyLoaded:true,company:decodedResponse});
            })
            .catch(error => console.log(error));
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    if (!this.state.companyLoaded) {
      return <div>Loading...</div>;
    }
    return <EditCompany history={this.props.history} match={this.props.match} company={this.state.company} />;
  }
}
