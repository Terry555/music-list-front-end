import React, { Component } from 'react';
import '../App.css';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'
import { connect } from 'react-redux';



class SelectedArtist extends Component {

  handleOnClick = () => {
    this.props.changeClick(!this.props.isClicked)
  }

  // {this.props.image[3]["#text"] === "" ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.image[3]["#text"]} alt="artist" />}
  render() {
    console.log(this.props.oneArtist.artist)
    return (
      <Card onClick={this.handleOnClick}>
        {this.props.oneArtist.artist ?
          <div>
          <Image src={this.props.oneArtist.artist.image[3]["#text"]} alt="artist" />
        <Card.Content>
          <Card.Header>{this.props.oneArtist.artist.name}</Card.Header>
          <Card.Description>{this.props.oneArtist.artist.bio.summary}</Card.Description>
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
    isClicked: state.isClicked
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
