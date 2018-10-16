import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'




class RecommendedArtistCard extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <Card>
          {this.props.image === null ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.image} alt="artist" />}
          <Card.Content>
            <Card.Header>{this.props.name}</Card.Header>
          </Card.Content>
      </Card>
      </div>
    );
  };


}

function mapStateToProps(state){
  return {
    savedArtist: state.savedArtist
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeClick: (beef) => {
      dispatch({type: "CHANGE CLICK", payload: beef})
    },
    handleOneArtist: (beef) => {
      dispatch({type: "SET ONE ARTIST", payload: beef})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedArtistCard);
