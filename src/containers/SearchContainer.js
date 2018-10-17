import React, { Component } from 'react';
import '../App.css';
import ResultContainer from './ResultContainer'
import SearchBar from '../presentational/SearchBar'

class SearchContainer extends Component {

  render() {
    return (
      <div>
      <SearchBar /><br></br>
      <ResultContainer />
      </div>
    );
  }

}


export default SearchContainer;
