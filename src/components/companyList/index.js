import React, { Component } from "react";
import ServerList from "./serverList";

export default class ServerListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      loadingCompanies:true,
      companies:null
    }
  }

  componentWillMount() {
        fetch("http://localhost:3001/companies", { method: "GET" })
          .then(response => {
            if (response.ok) {
              response
                .json()
                .then(decodedResponse => {
                  this.setState({companies:decodedResponse, loadingCompanies:false})
                })
                .catch(error => console.log(error));
            } else {
              throw new Error("Something went wrong ...");
            }
          })
          .catch(error => console.log(error));
  }

  render() {
    if (this.state.loadingCompanies) {
      return <div>Loading...</div>;
    }
    return <ServerList history={this.props.history} match={this.props.match} companies={this.state.companies} />;
  }
}
