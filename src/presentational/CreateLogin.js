import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


class CreateLogin extends Component {

  state = {
    userName: ''
  }

  componentDidMount(){
    if (this.props.currentUser) {
      this.props.setCurrentUser()
    }
  }

  setUserName = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/users', {
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'},
      method: 'POST',
      body: JSON.stringify({ name: this.state.userName})
  }).then(response => {
      if(response.ok){
        return response.json()
      }
      else{
        throw new Error('Name has been taken')
      }
    })
    .then(data=> {
    this.props.setCurrentUser(data)
    this.props.setCurrentUsersArtists(data.artists)
    this.props.setCurrentUsersRecommendations(data.artists)
    })
    .catch(error => alert(error))
}

  render() {
    return (
      <div className="login">
      <div>
        <div className="one column row">
        <form onSubmit={this.handleOnSubmit} className="ui form">
          <div className="field">
          <label id="otherBars" >Create Username: </label>
          <input
            style={{width: "300px"}}
            type="text"
            onChange={this.setUserName}
            placeholder="Create Username"
            maxLength="15"
            name="uname"
            required/>
        </div>
          <button className="ui tiny pink button" type="submit">Create</button>
        </form>
        <br></br>
      </div>
      {this.props.currentUser ? <h2>{this.props.currentUser.name} is signed in! hit "begin searching" to begin!</h2>: <br></br>}
        <NavLink to="/search"><button className="ui tiny pink button">Begin Searching</button></NavLink>
    </div>
  </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrentUser: (beef) => {
      dispatch({type: "SET CURRENT USER", payload: beef})
    },
    setCurrentUsersArtists: (beef) => {
      dispatch({type: "SET CURRENT USERS ARTISTS", payload: beef})
    },
    setCurrentUsersRecommendations: (beef) => {
      dispatch({type: "SET CURRENT USERS RECOMMENDATIONS", payload: beef})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateLogin);
