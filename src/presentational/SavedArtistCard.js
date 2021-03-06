import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'




class SavedArtistCard extends Component {

  deleteArtistOnClick = () => {
    fetch(`http://localhost:3000/api/v1/user_artists/${this.props.id}/${this.props.currentUser.id}`, {
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'},
        method: 'DELETE'
    }).then(()=>this.removeArtistAfterDeleting())
  }

  removeArtistAfterDeleting = () => {
    const artistArray = [...this.props.currentUsersArtists]
    const newArtistArray = artistArray.filter(artist=> artist.name !== this.props.name)
    this.props.setCurrentUsersArtists(newArtistArray)
  }

  render() {
    return (
      <section className="card">
        <Card>
          {this.props.image === "" ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.image} alt="artist" />}
          <Card.Content>
            <div className="header"><Card.Header>{this.props.name}</Card.Header></div>
            <div className="savedbuttonclass"><button className="ui tiny pink button" onClick={this.deleteArtistOnClick}>REMOVE</button></div>
          </Card.Content>
      </Card>
    </section>
    );
  };


}

function mapStateToProps(state){
  return {
    savedArtist: state.savedArtist,
    currentUser: state.currentUser,
    currentUsersArtists: state.currentUsersArtists,
    currentUsersRecommendations: state.currentUsersRecommendations
  }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrentUsersArtists: (currentUserArtist) => {
      dispatch({type: "SET CURRENT USERS ARTISTS", payload: currentUserArtist})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedArtistCard);
