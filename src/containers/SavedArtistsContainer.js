import React, { Component } from 'react';
import '../App.css';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SavedArtistCard from '../presentational/SavedArtistCard';


class SavedArtistsContainer extends Component {

  fetchBackEndArtist = () => {
    fetch('http://localhost:3000/api/v1/artists')
    .then(response => response.json())
    .then(data => this.props.selectSavedArtists(data), () => this.savedArtistIterator())
  }

  savedArtistIterator = () => {
    console.log(this.props)
    this.props.savedArtists.map((artist,idx) => {
      return <SavedArtistCard key={idx} {...artist}/>
    })
  }

  render() {

    return (
      <div>
      <h1 onClick={this.fetchBackEndArtist}>TESTING FROM SAVED ARTIST CONTAINER!</h1>
      {this.savedArtistIterator()}
      </div>
    );
  };

}

function mapStateToProps(state){
  return {
    savedArtists: state.savedArtists
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectSavedArtists: (beef) => {
      dispatch({type: "SELECT SAVED ARTISTS", payload: beef})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedArtistsContainer);
