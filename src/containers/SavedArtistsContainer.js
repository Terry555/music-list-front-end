import React, { Component } from 'react';
import '../App.css';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SavedArtistCard from '../presentational/SavedArtistCard';


class SavedArtistsContainer extends Component {

  render() {
    return (
      <div>
        <h1>SAVED ARTIST CONTAINER</h1>
      <div className="ui grid">
      {this.props.currentUser.artists ?
        this.props.currentUser.artists.map((artist,idx) => <SavedArtistCard key={idx} {...artist}/> )
        : null}
      </div>
      <h1>YOU MIGHT ALSO LIKE...</h1>
      <div className="ui grid">
        {this.props.currentUser.artists ?
          this.props.currentUser.artists.forEach(artist => <h3>artist.recommended_artists</h3>)
          : null}
      </div>
    </div>
    );
  };

}

function mapStateToProps(state){
  return {
    currentUsersSavedArtists: state.currentUsersSavedArtists,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrentUsersArtists: (beef) => {
      dispatch({type: "SET CURRENT USERS ARTISTS", payload: beef})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedArtistsContainer);
