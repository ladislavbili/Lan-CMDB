import React, { Component } from "react";
import AddServer from "./addServer";

export default class AddServerLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      companies:null,
      companiesLoaded:false
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
  }

  render() {
    if (!this.state.companiesLoaded) {
      return <div>Loading...</div>;
    }
    return <AddServer history={this.props.history} match={this.props.match} companies={this.state.companies} />;
  }
}
