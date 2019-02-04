import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

class SearchBar extends Component {

  componentDidMount(){
    this.props.setSearchTerm()
  }

  getSearchTerm = (event) => {
    event.preventDefault()
    const fixedSearchTerm = event.target.value.split(" ").join("+")
    setTimeout(()=>this.props.setSearchTerm(fixedSearchTerm),500)
  }

  render() {
    return (
      <div className="ui search">
      <div className="ui icon input">
        <input onChange={this.getSearchTerm} placeholder="search" type="text" />
      <i className="search icon"></i>
    </div>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    setSearchTerm: (searchTerm) => {
      dispatch({type: "GET SEARCH TERM", payload: searchTerm})
    }
  }
}


export default connect(null,mapDispatchToProps)(SearchBar);
