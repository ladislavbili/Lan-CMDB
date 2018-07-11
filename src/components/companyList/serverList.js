import React, { Component } from "react";
import { Table, Button, Input } from "reactstrap";
import "../../App.css";

export default class CompanyList extends Component {
  render() {
    return (
      <div>
        <h2>Companies</h2>
        <div style={{float:'left',marginLeft:10, marginBottom:15 }}>
        <Button color="primary" onClick={() => this.props.history.push("/companies/add/")}>
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
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {this.props.companies.map(company => (
              <tr
                key={company.id}
                className="link"
              >
                <td><Input type="checkbox" style={{ margin:'auto'}} /></td>
                <td onClick={() => this.props.history.push("/companies/edit/" + company.id)}>{company.id}</td>
                <td onClick={() => this.props.history.push("/companies/edit/" + company.id)}> {company.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
