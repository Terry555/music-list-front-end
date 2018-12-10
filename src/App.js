import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="welcome">
        <h1>WELCOME TO MUZAK!</h1>
        <p>Muzak allows you to create a profile of artists you currently like,
          as well as artists you want to check out later!
          Muzak will then recommend artists similar to your tastes.</p>
        <NavLink to="/createlogin"><button className="ui pink button loginbutton">CREATE USERNAME</button></NavLink>
        <NavLink to="/login"><button className="ui pink button loginbutton">LOG BACK IN</button></NavLink>
      </div>
    );
  }

}

export default App;
