import React, { Component } from 'react';
import '../App.css';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'
import { connect } from 'react-redux';



class SelectedArtist extends Component {

  handleOnClick = () => {
    this.props.changeClick(!this.props.isClicked)
  }

  postArtist = () => {
      fetch('http://localhost:3000/api/v1/artists', {
        headers: {
          'Content-Type':'application/json',
          'Accept': 'application/json'},
        method: 'POST',
        body: JSON.stringify({ name: this.props.oneArtist.artist.name})
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
        body: JSON.stringify({ name: similar_artist.name})
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

  // {this.props.image[3]["#text"] === "" ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.image[3]["#text"]} alt="artist" />}
  render() {

    return (
      <Card onClick={this.handleOnClick}>
        {this.props.oneArtist.artist ?
          <div>
          <Image src={this.props.oneArtist.artist.image[3]["#text"]} alt="artist" />
        <Card.Content>
          <Card.Header>{this.props.oneArtist.artist.name}</Card.Header>
          <Card.Description>{this.props.oneArtist.artist.bio.summary}</Card.Description>
          <button onClick={this.postArtist}>SAVE</button>
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
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeClick: (beef) => {
      dispatch({type: "CHANGE CLICK", payload: beef})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedArtist);
