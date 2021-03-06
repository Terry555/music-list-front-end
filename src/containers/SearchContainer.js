import React, { Component } from 'react';
import '../App.css';
import ResultContainer from './ResultContainer';
import SearchBar from '../presentational/SearchBar';
import PopularContainer from './PopularContainer';
import { connect } from 'react-redux';
import NavBar from '../presentational/NavBar';
import ModalCard from '../presentational/ModalCard';


class SearchContainer extends Component {

  render() {
    return (
      <div>
      <NavBar />
      {this.props.modalOpen && <ModalCard /> }
      <h1 className="searchbar">SEARCH FOR ARTISTS</h1>
      <div className="searchbar"><SearchBar /></div><br></br>
      <ResultContainer />
      <br></br>
      <PopularContainer />
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
    searchTerm: state.searchTerm,
    modalOpen: state.modalOpen
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleGetSearches: (searchResult) => {
      dispatch({type: "SHOW SEARCHES", payload: searchResult})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
