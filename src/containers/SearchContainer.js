import React, { Component } from 'react';
import '../App.css';
import ResultContainer from './ResultContainer';
import SearchBar from '../presentational/SearchBar';
import PopularContainer from './PopularContainer';
import { connect } from 'react-redux';
import NavBar from '../presentational/NavBar';


class SearchContainer extends Component {

  render() {
    return (
      <div>
      <NavBar />
      <PopularContainer />
      <SearchBar /><br></br>
      <ResultContainer />
      </div>
    );
  }

  apiSetter = () => {
    const ky = process.env.REACT_APP_LASTFM_API_KEY
    const name = this.props.searchTerm
    const API = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${ky}&format=json`
    return API
  }

  componentDidUpdate(){
    fetch(this.apiSetter())
    .then(response => response.json())
    .then(data => this.getData(data))
  }

  getData = (data) => {
    this.props.handleGetSearches(data)
  }

}

function mapStateToProps(state){
  return {
    searchTerm: state.searchTerm
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleGetSearches: (beef) => {
      dispatch({type: "SHOW SEARCHES", payload: beef})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
