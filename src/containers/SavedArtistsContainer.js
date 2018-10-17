import React, { Component } from 'react';
import '../App.css';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SavedArtistCard from '../presentational/SavedArtistCard';
import RecommendedArtistCard from '../presentational/RecommendedArtistCard';


class SavedArtistsContainer extends Component {

  // someDumbFunction = () => {
  //   if(this.props.currentUser.artists) {
  //     const recommendedArtists = []
  //     this.props.currentUser.artists.forEach(artist => artist.recommended_artists.forEach(artist => recommendedArtists.push(artist)))
  //     return recommendedArtists
  //   }
  // }

  render() {
    return (
      <div>
        <h1>SAVED ARTIST CONTAINER</h1>
      <div>
      {this.props.currentUser.artists ?
        this.props.currentUser.artists.map((artist,idx) => <div className="ui container"><SavedArtistCard key={idx} {...artist}/></div> )
        : null}
      </div>
      <h1>YOU MIGHT ALSO LIKE...</h1>
      <div className="ui grid">
        {this.props.currentUsersSavedArtists.map((recommend, idx) => <RecommendedArtistCard key={idx} {...recommend}/>)}
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
