import React, { Component } from 'react';
import '../App.css';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SavedArtistCard from '../presentational/SavedArtistCard';


class SavedArtistsContainer extends Component {

  fetchBackEndArtist = () => {
    fetch('http://localhost:3000/api/v1/artists', {
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'},
      method: 'POST',
      body: JSON.stringify({ name: "testing101112",
        similar_artists: "testing123", image: "testing123", tag: "testing123", bio: "testing123"})
    }).then(fetch('http://localhost:3000/api/v1/artists')
    .then(response => response.json())
    .then(data => this.props.selectSavedArtist(data)))
  }


  render() {
    const savedArtistIterator = this.props.savedArtist.map((artist,idx) => {
      return <SavedArtistCard key={idx} {...artist}/>
    })

    return (
      <div>
      <h1 onClick={this.fetchBackEndArtist}>TESTING FROM SAVED ARTIST CONTAINER!</h1>
      <h2></h2>
      {savedArtistIterator}
      </div>
    );
  };

}

function mapStateToProps(state){
  return {
    savedArtist: state.savedArtist
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectSavedArtist: (beef) => {
      dispatch({type: "SELECT SAVED ARTIST", payload: beef})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedArtistsContainer);
