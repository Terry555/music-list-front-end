import React, { Component } from 'react';
import '../App.css';
import { Container } from 'semantic-ui-react';
import ArtistCard from '../presentational/ArtistCard';

class ResultContainer extends Component {

  render() {
    return (
      <Container>
        <ArtistCard />
      </Container>
    );
  }

}


export default ResultContainer;
