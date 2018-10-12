import React, { Component } from 'react';
import '../App.css';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';

class SearchBar extends Component {

  getSearchTerm = (event) => {
    event.preventDefault()
    const fixedSearchTerm = event.target.value.split(" ").join("+")
    this.props.setSearchTerm(fixedSearchTerm)
  }

  render() {
    return (
      <div className="ui search">
      <div className="ui icon input">
        <input onChange={this.getSearchTerm} placeholder="search" type="text" />
      <i className='search icon'></i>
    </div>
    </div>
    );
  }

  // <Search onChange={this.getSearchTerm} type="text" placeholder="search"/>

}

function mapDispatchToProps(dispatch){
  return {
    setSearchTerm: (beef) => {
      dispatch({type: "GET SEARCH TERM", payload: beef})
    }
  }
}


export default connect(null,mapDispatchToProps)(SearchBar);
