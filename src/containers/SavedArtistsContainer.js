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
    console.log(this.props.currentUsersArtists)
    return (
      <div>
        <h1>SAVED ARTIST CONTAINER</h1>
      <div className="ui grid">
      {this.props.currentUsersArtists ?
        this.props.currentUsersArtists.map((artist,idx) => <SavedArtistCard key={`b${idx}`} {...artist}/> )
        : null}
      </div>
      <h1>YOU MIGHT ALSO LIKE...</h1>
      <div className="ui grid">
        {this.props.currentUsersRecommendations.map((recommend, idx) => <RecommendedArtistCard key={`a${idx}`} {...recommend}/>)}
      </div>
    </div>
    );
  };

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    currentUsersArtists: state.currentUsersArtists,
    currentUsersRecommendations: state.currentUsersRecommendations
  }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrentUsersRecommendations: (beef) => {
      dispatch({type: "SET CURRENT USERS RECOMMENDATIONS", payload: beef})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedArtistsContainer);
