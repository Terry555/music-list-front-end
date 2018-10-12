import React, { Component } from 'react';
import '../App.css';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'
import { connect } from 'react-redux';



class SelectedArtist extends Component {

  handleOnClick = () => {
    this.props.changeClick(!this.props.isClicked)
    const ky = process.env.REACT_APP_LASTFM_API_KEY
    const name = "Pink+Floyd"
    const API = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${ky}&format=json`
    fetch(API)
    .then(response => response.json())
    .then(data => console.log(data))
  }

  // {this.props.image[3]["#text"] === "" ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.image[3]["#text"]} alt="artist" />}
  render() {
    return (
      <Card onClick={this.handleOnClick}>
        <Card.Content>
          <Card.Header>{this.props.oneArtist.name}</Card.Header>
          <Card.Description>{}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps(state){
  return {
    oneArtist: state.oneArtist
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleOneArtist: (beef) => {
      dispatch({type: "SET ONE ARTIST", payload: beef})
    },
    changeClick: (beef) => {
      dispatch({type: "CHANGE CLICK", payload: beef})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedArtist);
