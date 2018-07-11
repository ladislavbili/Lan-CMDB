import React, { Component } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import "./App.css";
import styles from './styles.js';
import Sidebar from "./components/sidebar";
import ServerList from "./components/serverList";
import AddServer from "./components/addServer";
import EditServer from "./components/editServer";
import CompanyList from "./components/companyList";
import AddCompany from "./components/addCompany";
import EditCompany from "./components/editCompany";
import { Nav, NavItem, Row, Input,InputGroup,InputGroupAddon, NavLink } from 'reactstrap';
const sidebarWidth=300;
const filterWidth=200;

export default class Navigation extends Component {
  constructor(props){
    super(props);
    this.state={
      displaySidebar:true,
      displayFilter:false,
    };
  }
  render() {
    let routerMargin=0;
    if(this.state.displaySidebar){
      routerMargin+=sidebarWidth;
    }
    if(this.state.displayFilter){
      routerMargin+=filterWidth;
    }
    return (
      <div>
        <div className="App">
          <Nav className="App-header">
            <NavItem style={{paddingLeft:10, cursor:'pointer', fontSize:'20px'}}
              onClick={()=>this.setState({displaySidebar:!this.state.displaySidebar})}>
              <i
                className='fa fa-bars'
                />
            </NavItem>
             <NavLink href="#/">LAN CMDB</NavLink>
            {false &&
            <NavItem style={{paddingLeft:10, cursor:'pointer', fontSize:'20px'}}
              onClick={()=>this.setState({displayFilter:!this.state.displayFilter})}>
              <i
                className='fa fa-filter'
                />
            </NavItem>
          }
            { false &&
              <NavItem>
                <InputGroup style={{color:'black', backgroundColor:'white', borderRadius:10, marginLeft: 10, paddingLeft: 10}}>
                  <InputGroupAddon>
                    <i className="fa fa-search" style={{ fontSize:'15px', marginTop:10}} />
                  </InputGroupAddon>
                  <Input style={{ border:'none'}} placeholder="search" />
                </InputGroup>
              </NavItem>
            }
          </Nav>

          <Row style={styles.main}>
            <div style={{transition:"1s",width:sidebarWidth,position:'absolute', backgroundColor:'white', zIndex:50, ...this.state.displaySidebar?{}:{marginLeft:-sidebarWidth}}}>
              <Sidebar />
            </div>
            <div style={{width:filterWidth,position:'absolute',transition:"1s", zIndex:49,left:this.state.displaySidebar?sidebarWidth:0, ...this.state.displayFilter?{}:{marginLeft: -filterWidth}}}>
              filter
            </div>
            <div style={{marginLeft:routerMargin,transition:'1s', width:'100%'}}>
              <HashRouter>
                <div>
                  {/* SERVERS */}
                  <Switch>
                    <Route exact path="/company/:companyID/servers" component={ServerList} />
                  </Switch>
                  <Switch>
                    <Route exact path="/company/:companyID/servers/add/" component={AddServer} />
                  </Switch>
                  <Switch>
                    <Route exact path="/company/:companyID/servers/edit/:id" component={EditServer} />
                  </Switch>
                  {/* COMPANIES */}
                  <Switch>
                    <Route exact path="/companies" component={CompanyList} />
                  </Switch>
                  <Switch>
                    <Route exact path="/companies/add" component={AddCompany} />
                  </Switch>
                  <Switch>
                    <Route exact path="/companies/edit/:id" component={EditCompany} />
                  </Switch>
                </div>
              </HashRouter>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}
