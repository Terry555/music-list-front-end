import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'



class PopularCard extends Component {

  setArtistOnClick = () => {

    const ky = process.env.REACT_APP_LASTFM_API_KEY
    const name = this.props.artist.name.split("+").join("and").split(" ").join("+")
    const API = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${ky}&format=json`
    fetch(API)
    .then(response => response.json())
    .then(data => this.props.setOneArtist(data)).then(this.props.handleModalOpen())

  }


  render() {
    return (
      <section className="card">
        <Card onClick={this.setArtistOnClick}>
          {this.props.artist.image[3]["#text"] === "" ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.artist.image[3]["#text"]} alt="artist" />}
          <Card.Content>
            <div className="header"><Card.Header>{this.props.artist.name}</Card.Header></div>
      </Card.Content>
      </Card>
    </section>
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
    setOneArtist: (oneArtist) => {
      dispatch({type: "SET ONE ARTIST", payload: oneArtist})
    },
    handleModalOpen: (openModal) => {
      dispatch({type: "HANDLE MODAL OPEN", payload: openModal})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularCard);
