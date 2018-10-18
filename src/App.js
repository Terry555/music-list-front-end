import React, { Component } from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer';
import SavedArtistsContainer from './containers/SavedArtistsContainer';
import Login from './presentational/Login';
import NavBar from './presentational/NavBar';
import { NavLink } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h2>WELCOME TO THE HOME PAGE! CLICK TO GET STARTED</h2>
        <NavLink to="/login"><button>GET STARTED</button></NavLink>
      </div>
    );
  }

  // <NavBar />
  // <Login />
  // <SavedArtistsContainer />
  // <h1>{this.props.searchTerm}</h1>
  // <SearchContainer />

}

export default App;
