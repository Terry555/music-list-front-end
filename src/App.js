import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import SearchContainer from './containers/SearchContainer';
import SavedArtistsContainer from './containers/SavedArtistsContainer';
import Login from './presentational/Login';

const endPoint = `http://localhost:3000/api/v1/artists`
// const ky = process.env.REACT_APP_LASTFM_API_KEY
// const name = 'Pink+Floyd'
// const API = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${ky}&format=json`
// const API_TWO = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${ky}&format=json`

class App extends Component {

  getData = (data) => {
    this.props.handleGetSearches(data)
  }

  apiSetter = () => {
    const ky = process.env.REACT_APP_LASTFM_API_KEY
    const name = this.props.searchTerm
    const API = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${ky}&format=json`
    return API
  }

  render() {
    return (
      <div className="App">
        <Login />
        <SavedArtistsContainer />
        <h1>{this.props.searchTerm}</h1>
        <SearchContainer />
      </div>
    );
  }

  componentDidUpdate(){
    fetch(endPoint)
    .then(response => response.json())
    .then(data => console.log())

    fetch(this.apiSetter())
    .then(response => response.json())
    .then(data => this.getData(data))
  }


}


function mapStateToProps(state){
  return {
    searchTerm: state.searchTerm
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleGetSearches: (beef) => {
      dispatch({type: "SHOW SEARCHES", payload: beef})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
