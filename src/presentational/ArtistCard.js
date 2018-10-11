import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react'



class ArtistCard extends Component {

  shorterBio = () => {
    const n = this.props.artistBio.indexOf('<')
    return this.props.artistBio.slice(0,n) + "..."
  }

  render() {


    return (
      <div>
      <Card>
        <Image src={this.props.artistImage} alt="artist" />
        <Card.Content>
          <Card.Header>{this.props.artistName}</Card.Header>
          <Card.Description>{this.shorterBio()}</Card.Description>
        </Card.Content>
      </Card>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    artistName: state.artistName,
    artistBio: state.artistBio,
    artistImage: state.artistImage
  }
}

export default connect(mapStateToProps)(ArtistCard);
