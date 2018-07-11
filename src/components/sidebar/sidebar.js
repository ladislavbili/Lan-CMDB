import React, { Component } from "react";
import { InputGroup, FormGroup, Nav, NavLink } from 'reactstrap';
import Select from "react-select";

export default class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state={
      company:this.props.companies.map(company => {
        company.label = company.title;
        company.value = company.id;
        return company;
      })[0],
      asset:null,
    }
    this.updateURL.bind(this);
  }

  componentWillMount(){
    let url =window.location.href;
    let index = url.indexOf('company/');
    if(index!==-1){
      let newURL = url.substring(index+'company/'.length,url.length);
      index = newURL.indexOf('/');
      let companyID = newURL.substring(0,index);
      newURL = newURL.substring(companyID.length+1,newURL.length);
      index = newURL.indexOf('/');
      let asset = "";
      if(index===-1){
        asset = newURL;
      }
      else{
        asset = newURL.substring(0,index);
      }
      let company = this.props.companies.map(company => {
        company.label = company.title;
        company.value = company.id;
        return company;
      }).find((item)=>item.id.toString()===companyID);
      if(company!==undefined){
        this.setState({
          asset,
          company
        });
      }
      else{
        this.setState({
          asset
        });

      }
    }
  }

  updateURL(item, value){
    let state = {...this.state};
    state[item]=value;
    if(state.asset){
      window.location.href = "#/company/"+state.company.id+'/'+state.asset;
    }
  }

  render() {
    return (
      <div style={{padding:5,marginRight:'2px', borderRight: '2px solid black', height:'calc(100vh - 60px)', textAlign:'left'}}>
        <FormGroup style={{marginTop:15,fontSize:18}}>
          <label htmlFor="projectSelect"><i className="fa fa-building" style={{float:'left', marginTop:5, marginRight:5}} /> Company</label>
          <InputGroup>
            <Select
              className="fullWidth"
              id="projectSelect"
              options={this.props.companies.map(company => {
                company.label = company.title;
                company.value = company.id;
                return company;
              })}
              value={this.state.company}
              onChange={e => {
                this.updateURL('company',e);
                this.setState({company:e});
              }}
              />
          </InputGroup>
        </FormGroup>

        <Nav vertical style={{fontSize:18}}>
        {this.props.assets.map((item)=>
          <NavLink key={item.id} href="#" onClick={()=>{this.updateURL('asset',item.link);this.setState({asset:item.link});}} className="sidebarNavItem" style={{paddingTop:5, paddingBottom:5, paddingLeft:10}}>
            {item.title}
          </NavLink>
        )}
        <label style={{paddingTop:20}}><i className="fa fa-cog" style={{float:'left', marginTop:5 }} /><span style={{marginLeft:5 }}>Settings</span></label>
        </Nav>
        <NavLink href="#/companies" onClick={()=>this.setState({asset:null})} className="sidebarNavItem" style={{paddingTop:5, paddingBottom:5, paddingLeft:10}}>
          List of companies
        </NavLink>

      </div>
    );
  }

}
