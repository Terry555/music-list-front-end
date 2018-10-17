import React, { Component } from 'react';
import '../App.css';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'
import { connect } from 'react-redux';



class SelectedArtist extends Component {

  state = {
    name: '',
    image: '',
    bio: ''
  }

  handleOnClick = () => {
    this.props.changeClick(!this.props.isClicked)
  }

  postArtist = () => {
      fetch('http://localhost:3000/api/v1/artists', {
        headers: {
          'Content-Type':'application/json',
          'Accept': 'application/json'},
        method: 'POST',
        body: JSON.stringify({ name: this.props.oneArtist.artist.name,
                              image: this.props.oneArtist.artist.image[3]["#text"],
                              bio: this.props.oneArtist.artist.bio.summary
                            })
    }).then(response => response.json()).then(data => {
      this.postRecommendations(data)
  fetch('http://localhost:3000/api/v1/user_artists', {
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json'},
      method: 'POST',
      body: JSON.stringify({ user_id: this.props.currentUser.id, artist_id: data.id})
    })
  })
}

  postRecommendations = (artist) => {
    const similarArtists = this.props.oneArtist.artist.similar.artist.forEach(similar_artist => {
      fetch('http://localhost:3000/api/v1/recommended_artists', {
        headers: {
          'Content-Type':'application/json',
          'Accept': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ name: similar_artist.name,
                                image: similar_artist.image[3]["#text"]
                            })
      }).then(response => response.json()).then(data => {
        fetch('http://localhost:3000/api/v1/recommendations', {
          headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'},
            method: 'POST',
            body: JSON.stringify({ artist_id: artist.id, recommended_artist_id: data.id})
        })
      })
    })
  }

  saveButtonFunction = () => {
    this.postArtist()
    this.setArtistStateAfterPosting()
    // this.setRecommendationsAfterPosting()
  }

  setArtistStateAfterPosting = () => {
    const newArtistArray = [...this.props.currentUsersArtists]
    const newArtist = {
      name: this.props.oneArtist.artist.name,
      bio: this.props.oneArtist.artist.bio.summary,
      image: this.props.oneArtist.artist.image[3]["#text"]}
    newArtistArray.push(newArtist)
    this.props.setCurrentUsersArtists(newArtistArray)
  }

  // setRecommendationsAfterPosting = () => {
  //   console.log(this.props.currentUsersRecommendations)
  //   const newRecommendationArray = [...this.props.currentUsersRecommendations]
  //   const newRecommendation = {
  //     name: ''
  //   }
  //   newRecommendationArray.push(newRecommendation)
  //   this.props.setCurrentUsersRecommendations(newRecommendationArray)
  // }

  render() {
    return (
      <Card onClick={this.handleOnClick}>
        {this.props.oneArtist.artist ?
          <div>
          <Image src={this.props.oneArtist.artist.image[3]["#text"]} alt="artist" />
        <Card.Content>
          <Card.Header>{this.props.oneArtist.artist.name}</Card.Header>
          <Card.Description>{this.props.oneArtist.artist.bio.summary}</Card.Description>
          <button className="ui tiny pink button" onClick={this.saveButtonFunction}>SAVE</button>
        </Card.Content>
      </div>
        :
        <h2>Loading...</h2>}
      </Card>
    );
  }
}

function mapStateToProps(state){
  return {
    oneArtist: state.oneArtist,
    isClicked: state.isClicked,
    currentUser: state.currentUser,
    currentUsersArtists: state.currentUsersArtists,
    currentUsersRecommendations: state.currentUsersRecommendations
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeClick: (beef) => {
      dispatch({type: "CHANGE CLICK", payload: beef})
    },
    setCurrentUser: (beef) => {
      dispatch({type: "SET CURRENT USER", payload: beef})
    },
    setCurrentUsersArtists: (beef) => {
      dispatch({type: "SET CURRENT USERS ARTISTS", payload: beef})
    },
    setCurrentUsersRecommendations: (beef) => {
      dispatch({type: "SET CURRENT USERS RECOMMENDATIONS", payload: beef})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedArtist);
