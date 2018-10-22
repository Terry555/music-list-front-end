import React, { Component } from 'react';
import '../App.css';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SavedArtistCard from '../presentational/SavedArtistCard';
import RecommendedArtistCard from '../presentational/RecommendedArtistCard';
import NavBar from '../presentational/NavBar';



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
        <NavBar />
        <h1 className="searchbar">YOUR SAVED ARTISTS</h1>
      <div className="popular-artist-card">
      {this.props.currentUsersArtists ?
        this.props.currentUsersArtists.map((artist,idx) => <SavedArtistCard key={`b${idx}`} {...artist}/> )
        : null}
      </div>
      <h1 className="searchbar">YOU MIGHT ALSO LIKE...</h1>
      <div className="popular-artist-card">
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
