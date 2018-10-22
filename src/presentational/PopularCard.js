import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react'
import defaultImage from '../images/defaultimage.gif'



class PopularCard extends Component {

  render() {
    return (
      <section className="card">
        <Card>
          {this.props.artist.image[3]["#text"] === "" ? <Image src={defaultImage} alt="artist" /> : <Image src={this.props.artist.image[3]["#text"]} alt="artist" />}
          <Card.Content>
            <Card.Header>{this.props.artist.name}</Card.Header>
      </Card.Content>
      </Card>
    </section>
    );
  }


}

export default PopularCard;
