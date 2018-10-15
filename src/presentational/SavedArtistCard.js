import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react'



class SavedArtistCard extends Component {

  render() {
    return (
      <div>
      <h2>{this.props.name}</h2>
      <h3>{this.props.tag}</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedArtistCard);
