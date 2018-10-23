import React, { Component } from 'react';
import '../App.css';
import { Search } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';



class NavBar extends Component {

  render() {
    return (
      <div className="ui teal secondary menu">
        <NavLink to="/search"><span className="item">Search</span></NavLink>
        <NavLink to="/saved"><span className="item">Profile</span></NavLink>
    <div className="right menu">
        <span className="ui item">{this.props.currentUser.name} is currently signed in.</span>
        <NavLink to="/"><span className="ui item">Logout</span></NavLink>
      </div>
  </div>
    );
  }

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(NavBar);
