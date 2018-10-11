import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import SearchContainer from './containers/SearchContainer';

const musicImage = "http://pluspng.com/img-png/png-hd-music-notes-free-music-clipart-black-and-white-hd-images-download-white-music-notes-on-transparent-background-hd-music-clipart-vector-png-and-svg-800.png"
const endPoint = `http://localhost:3000/api/v1/artists`
const ky = process.env.REACT_APP_LASTFM_API_KEY
const name = 'Pink+Floyd'
const API = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${ky}&format=json`


class App extends Component {

  getData = (data) => {
    this.props.handleGetName(data.artist.name)
    this.props.handleGetBio(data.artist.bio.summary)
    this.props.handleGetImage(data.artist.image[4]["#text"])
  }

  render() {
    console.log(this.props.searchTerm)
    return (
      <div className="App">
        <header>
          <img src={musicImage} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. Or don't, whatever. YOLO.
          </p>
        </header>
        <SearchContainer />
      </div>
    );
  }

  componentDidMount(){
    fetch(endPoint)
    .then(response => response.json())
    .then(data => console.log())

    fetch(API)
    .then(response => response.json())
    .then(data => this.getData(data))
  }


}


function mapStateToProps(state){
  return {
    artistName: state.artistName,
    artistBio: state.artistBio,
    searchTerm: state.searchTerm
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleGetName: (beef) => {
      dispatch({type: "SHOW NAME", payload: beef})
    },
    handleGetBio: (beef) => {
      dispatch({type: "SHOW BIO", payload: beef})
    },
    handleGetImage: (beef) => {
      dispatch({type: "SHOW IMAGE", payload: beef})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
