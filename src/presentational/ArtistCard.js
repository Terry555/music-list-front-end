import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'



class ArtistCard extends Component {

  handleOnClick = () => {

    const ky = process.env.REACT_APP_LASTFM_API_KEY
    const name = this.props.name.split("+").join("and").split(" ").join("+")
    const API = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${ky}&format=json`
    fetch(API)
    .then(response => response.json())
    .then(data => this.props.setOneArtist(data)).then(this.props.handleModalOpen())

  }

  render() {
    return (
      <section className="card">
      <Card onClick={this.handleOnClick}>
        {this.props.image[3]["#text"] === "" ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.image[3]["#text"]} alt="artist" />}
        <Card.Content>
          <div className="header"><Card.Header>{this.props.name}</Card.Header></div>
          <Card.Description>{}</Card.Description>
        </Card.Content>
      </Card>
    </section>
    );
  }


}

function mapStateToProps(state){
  return {
    allSearches: state.allSearches,
    isClicked: state.isClicked,
    oneArtist: state.oneArtist
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeClick: (beef) => {
      dispatch({type: "CHANGE CLICK", payload: beef})
    },
    setOneArtist: (beef) => {
      dispatch({type: "SET ONE ARTIST", payload: beef})
    },
    handleModalOpen: (beef) => {
      dispatch({type: "HANDLE MODAL OPEN", payload: beef})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistCard);
