import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import defaultImage from '../images/defaultimage.gif';




class RecommendedArtistCard extends Component {

  fetchArtistInformation = () => {
    const ky = process.env.REACT_APP_LASTFM_API_KEY
    const name = this.props.name.split("+").join("and").split(" ").join("+")
    const API = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${ky}&format=json`
    fetch(API)
    .then(response => response.json())
    .then(data => this.props.setOneArtist(data)).then(() =>this.postArtist())
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
    this.setArtistStateAfterPosting()
    this.setRecommendationsAfterPosting()
  }

  saveButtonFunction = () => {
    this.fetchArtistInformation()
    if (this.props.oneArtist) {
    this.setArtistStateAfterPosting()
    this.setRecommendationsAfterPosting()
  }
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

  setRecommendationsAfterPosting = () => {
    const newRecommendationArray = [...this.props.currentUsersRecommendations]
    this.props.oneArtist.artist.similar.artist.forEach(artist => {
      return newRecommendationArray.push({name: artist.name, image: artist.image[3]["#text"]})
    })
    this.props.setCurrentUsersRecommendations(newRecommendationArray)
  }

  render() {
    return (
      <section className="card">
        <Card>
            {this.props.image === null ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.image} alt="artist" />}
            <Card.Content>
        <div className="header"><Card.Header>{this.props.name}</Card.Header></div>
          <div className="buttonclass"><button className="ui tiny pink button" onClick={this.fetchArtistInformation}>SAVE</button></div>
        </Card.Content>
      </Card>
    </section>
    );
  };
  // <div>
  //   <Card>
  //     {this.props.image === null ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.image} alt="artist" />}
  //     <Card.Content>
  //       <Card.Header>{this.props.name}</Card.Header>
        // <button className="ui tiny pink button" onClick={this.fetchArtistInformation}>SAVE</button>
  //     </Card.Content>
  //   </Card>
  // </div>

}


function mapStateToProps(state){
  return {
    oneArtist: state.oneArtist,
    currentUser: state.currentUser,
    currentUsersArtists: state.currentUsersArtists,
    currentUsersRecommendations: state.currentUsersRecommendations

  }
}

function mapDispatchToProps(dispatch){
  return {
    setOneArtist: (beef) => {
      dispatch({type: "SET ONE ARTIST", payload: beef})
    },
    setCurrentUsersArtists: (beef) => {
      dispatch({type: "SET CURRENT USERS ARTISTS", payload: beef})
    },
    setCurrentUsersRecommendations: (beef) => {
      dispatch({type: "SET CURRENT USERS RECOMMENDATIONS", payload: beef})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecommendedArtistCard);
