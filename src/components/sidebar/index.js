import React, { Component } from "react";
import Sidebar from "./sidebar";

export default class SidebarLoader extends Component {
  constructor(props){
    super(props);
    this.state={
      loadingCompanies:true,
      companies:null,
      loadingAssets:true,
      assets:null,
    }
  }

  componentWillMount() {
    fetch("http://localhost:3001/companies", { method: "GET" })
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(decodedResponse => {
              this.setState({loadingCompanies:false,companies:decodedResponse});
            })
            .catch(error => console.log(error));
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch(error => console.log(error));

    fetch("http://localhost:3001/assets", { method: "GET" })
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(decodedResponse => {
              this.setState({loadingAssets:false,assets:decodedResponse});
            })

            .catch(error => console.log(error));
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    if(this.state.loadingCompanies || this.state.loadingAssets){
      return <div>Loading sidebar...</div>
    }
    return <Sidebar assets={this.state.assets} companies={this.state.companies}/>;
  }
}
