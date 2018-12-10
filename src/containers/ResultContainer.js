import React, { Component } from 'react';
import '../App.css';
import ArtistCard from '../presentational/ArtistCard';
import { connect } from 'react-redux';


class ResultContainer extends Component {


  render() {
    return (
      <div>
          <div className="searchcontainer">
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
      </div>

    </div>
    );
  }

}

function mapStateToProps(state){
  return {
    allSearches: state.allSearches,
    searchTerm: state.searchTerm
    }
}


export default connect(mapStateToProps)(ResultContainer);
