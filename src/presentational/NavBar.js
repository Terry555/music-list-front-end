import React, { Component } from 'react';
import '../App.css';
import { Search } from 'semantic-ui-react';

class NavBar extends Component {

  render() {
    return (
      <div className="ui teal secondary menu">
        <a className="item">Home</a>
        <a className="item">Search</a>
        <a className="item">Profile</a>
    <div className="right menu">
        <a className="ui item">Logout</a>
    </div>
  </div>
    );
  }

}


export default NavBar;
