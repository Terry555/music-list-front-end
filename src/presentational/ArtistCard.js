import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'



class ArtistCard extends Component {

  handleOnClick = () => {
    console.log(this.props.isClicked)
    this.props.changeClick(!this.props.isClicked)
  }

  render() {
    return (
      <div>
      <Card onClick={this.handleOnClick}>
        {this.props.image[3]["#text"] === "" ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.image[3]["#text"]} alt="artist" />}
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Description>{}</Card.Description>
        </Card.Content>
      </Card>
      </div>
    );
  }


}

function mapStateToProps(state){
  return {
    allSearches: state.allSearches,
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistCard);
