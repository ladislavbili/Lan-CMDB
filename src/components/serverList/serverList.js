import React, { Component } from "react";
import { Table, Button, Input } from "reactstrap";
import "../../App.css";

export default class ServerList extends Component {
  render() {
    const servers = this.props.servers;
    return (
      <div>
        <h2>Servers</h2>
        <div style={{float:'left',marginLeft:10, marginBottom:15 }}>
        <Button color="primary" onClick={() => this.props.history.push("/company/"+this.props.match.params.companyID+"/servers/add/")}>
          Add new
        </Button>
        <Button color="danger" style={{marginLeft:10 }}>
          Delete
        </Button>
      </div>
        <Table>
          <thead>
            <tr>
              <th style={{width:50}}></th>
              <th>ID</th>
              <th>Host</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {servers.map(server => (
              <tr
                key={server.id}
                className="link"
              >
              <td>
                    <Input type="checkbox" style={{ margin:'auto'}} />
                </td>
                <td onClick={() => this.props.history.push("/company/"+this.props.match.params.companyID+"/servers/edit/" + server.id)}>{server.id}</td>
                <td onClick={() => this.props.history.push("/company/"+this.props.match.params.companyID+"/servers/edit/" + server.id)}> {server.host}</td>
                <td onClick={() => this.props.history.push("/company/"+this.props.match.params.companyID+"/servers/edit/" + server.id)}>{server.company.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
