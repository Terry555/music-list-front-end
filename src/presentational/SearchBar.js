import React, { Component } from 'react';
import '../App.css';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';

class SearchBar extends Component {


  render() {
    return (
      <div>
        <Search onChange={this.getSearchTerm} type="text" placeholder="search"/>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch){
  return {
    getSearchTerm: (beef) => {
      dispatch({type: "GET SEARCH TERM", payload: beef})
    }
  }
}


export default connect(mapDispatchToProps)(SearchBar);
