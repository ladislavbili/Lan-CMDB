import React, { Component } from "react";
import ServerList from "./serverList";

export default class ServerListLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      serversLoaded:false,
      servers:null
    }
  }

  componentWillMount() {
        fetch("http://localhost:3001/servers?company.id="+this.props.match.params.companyID, { method: "GET" })
          .then(response => {
            if (response.ok) {
              response
                .json()
                .then(decodedResponse => {
                  this.setState({servers:decodedResponse, serversLoaded:true})
                })
                .catch(error => console.log(error));
            } else {
              throw new Error("Something went wrong ...");
            }
          })
          .catch(error => console.log(error));
  }

  componentWillReceiveProps(props){
    if(this.props.match.params.companyID!==props.match.params.companyID){
      fetch("http://localhost:3001/servers?company.id="+props.match.params.companyID, { method: "GET" })
        .then(response => {
          if (response.ok) {
            response
              .json()
              .then(decodedResponse => {
                this.setState({servers:decodedResponse, serversLoaded:true})
              })
              .catch(error => console.log(error));
          } else {
            throw new Error("Something went wrong ...");
          }
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    if (!this.state.serversLoaded) {
      return <div>Loading...</div>;
    }
    return <ServerList history={this.props.history} match={this.props.match} servers={this.state.servers} />;
  }
}
