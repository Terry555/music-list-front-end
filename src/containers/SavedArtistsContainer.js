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
    console.log(this.props)
    return (
      <div>
        <h1>SAVED ARTIST CONTAINER</h1>
      <div>
      {this.props.currentUser.artists ?
        this.props.currentUser.artists.map((artist,idx) => <div key={`b${idx}`} className="ui container"><SavedArtistCard  {...artist}/></div> )
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
    currentUsersRecommendations: state.currentUsersRecommendations,
    currentUser: state.currentUser
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
