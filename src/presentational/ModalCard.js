import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image, Modal } from 'semantic-ui-react';
import YouTubePlayer from './YouTubePlayer';



class ModalCard extends Component {

  saveButtonFunction = () => {
    this.postArtist()
    this.setArtistStateAfterPosting()
    this.setRecommendationsAfterPosting()
    this.setTagsAfterPosting()
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

  setArtistStateAfterPosting = () => {
    const newArtistArray = [...this.props.currentUsersArtists]
    const newArtist = {
      name: this.props.oneArtist.artist.name,
      bio: this.props.oneArtist.artist.bio.summary,
      image: this.props.oneArtist.artist.image[3]["#text"]}
     const testingArray = newArtistArray.filter(artist => newArtist.name === artist.name)
     if (testingArray[0])
    {
      return null
    }
    else {
       newArtistArray.push(newArtist)
    this.props.setCurrentUsersArtists(newArtistArray)
    }
  }

  setRecommendationsAfterPosting = () => {
    const newRecommendationArray = [...this.props.currentUsersRecommendations]
    this.props.oneArtist.artist.similar.artist.forEach(artist => {
      return newRecommendationArray.push({name: artist.name, image: artist.image[3]["#text"]})
    })
    this.props.setCurrentUsersRecommendations(newRecommendationArray)
    this.props.handleModalClose()
  }

  setTagsAfterPosting = () => {
    const newTagArray = [...this.props.currentUsersTags]
    this.props.oneArtist.artist.tags.tag.forEach(tag => newTagArray.push(tag.name))
    this.props.setCurrentUsersTags(newTagArray)
  }

  render() {
    return (
        <Modal
          closeIcon
          open={this.props.modalOpen}
          onClose={this.props.handleModalClose}
          basic
          size="large"
          >
          {this.props.oneArtist.artist ?
            <div>
            <div className="selectedcardcontainer">
            <section className="selectedcard">
            <Card>
            <Image src={this.props.oneArtist.artist.image[3]["#text"]} alt="artist" />
              <Card.Content className="selectedcontent">
                <div className="header"><Card.Header>{this.props.oneArtist.artist.name}</Card.Header></div>
                <Card.Description>{this.props.oneArtist.artist.bio.summary.split("<a href")[0]}...</Card.Description>
                <div className="modalbutton"><button className="ui tiny pink button" onClick={this.saveButtonFunction}>SAVE</button></div>
              </Card.Content>
          </Card>
          </section>
        </div>
        <div className="selectedcardvideo">
          <YouTubePlayer />
          </div>
        </div>
          :
          <h2>Loading...</h2>}
      </Modal>
    );
  }


}


function mapStateToProps(state){
  return {
    oneArtist: state.oneArtist,
    modalOpen: state.modalOpen,
    currentUser: state.currentUser,
    currentUsersArtists: state.currentUsersArtists,
    currentUsersRecommendations: state.currentUsersRecommendations,
    currentUsersTags: state.currentUsersTags
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleModalClose: () => {
      dispatch({type: "HANDLE MODAL CLOSE", payload: null})
    },
    setCurrentUser: (currentUser) => {
      dispatch({type: "SET CURRENT USER", payload: currentUser})
    },
    setCurrentUsersArtists: (currentUserArtist) => {
      dispatch({type: "SET CURRENT USERS ARTISTS", payload: currentUserArtist})
    },
    setCurrentUsersRecommendations: (currentUserRecommendation) => {
      dispatch({type: "SET CURRENT USERS RECOMMENDATIONS", payload: currentUserRecommendation})
    },
    setCurrentUsersTags: (currentUserTags) => {
      dispatch({type: "SET CURRENT USERS TAGS", payload: currentUserTags})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCard);
