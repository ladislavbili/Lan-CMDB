import React, { Component } from "react";
import EditServer from "./editServer";

export default class EditServerLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      companies:null,
      companiesLoaded:false,
      server: null,
      serverLoaded:false,
    }
  }
  componentWillMount() {
    fetch("http://localhost:3001/companies", { method: "GET" })
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(decodedResponse => {
              this.setState({companiesLoaded:true,companies:decodedResponse});
            })
            .catch(error => console.log(error));
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch(error => console.log(error));
    fetch("http://localhost:3001/servers/"+this.props.match.params.id, { method: "GET" })
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(decodedResponse => {
              this.setState({serverLoaded:true,server:decodedResponse});
            })
            .catch(error => console.log(error));
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    if (!this.state.companiesLoaded|| !this.state.serverLoaded) {
      return <div>Loading...</div>;
    }
    return <EditServer history={this.props.history} match={this.props.match} server={this.state.server} companies={this.state.companies} />;
  }
}
