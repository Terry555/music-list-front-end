import React, { Component } from 'react';
import '../App.css';
import { Container } from 'semantic-ui-react';
import ArtistCard from '../presentational/ArtistCard';
import { connect } from 'react-redux';
import SelectedArtist from '../presentational/SelectedArtist';


class ResultContainer extends Component {


  render() {
    return (
      <div>
        {this.props.isClicked ?
          <SelectedArtist />
          :
      <div className="ui grid">
        { this.props.searchTerm ?
          this.props.allSearches.results ?
            this.props.allSearches.results.artistmatches.artist.map((artist,idx) =>
            {return <ArtistCard key={idx} {...artist} />})
              :
              <h3>Loading...</h3>
              :
              <h3>search here!</h3>
              }
      </div>
    }
    </div>
    );
  }

}

function mapStateToProps(state){
  return {
    allSearches: state.allSearches,
    searchTerm: state.searchTerm,
    isClicked: state.isClicked
  }
}


export default connect(mapStateToProps)(ResultContainer);
