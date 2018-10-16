import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

class Login extends Component {

  state = {
    userName: '',
    allUsers: [],
    selectedUser: {name: "", id: ""}
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/users', {
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'},
      method: 'POST',
      body: JSON.stringify({ name: this.state.userName})
  })
}

  setUserName = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  displayUsers = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/users/')
    .then(response => response.json())
    .then(data => {
      this.setState({
        allUsers: data
      }, () => {this.userIterator()})
    })
  }

  userIterator = () => {
    const selectedUser = this.state.allUsers.find(user =>{
       return user.name === this.state.userName
     })
     if (selectedUser){
       this.props.setCurrentUser(selectedUser)
       const recommendedArtistArray = []
       selectedUser.artists.forEach(artist => artist.recommended_artists.forEach(artist => recommendedArtistArray.push(artist)))
       this.props.setCurrentUsersArtists(recommendedArtistArray)
     }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <label>Create Username: </label>
          <input
            type="text"
            onChange={this.setUserName}
            placeholder="Create Username"
            maxLength="15"
            name="uname"
            required/>
          <button type="submit">Create</button>
        </form>
        <form onSubmit={this.displayUsers}>
          <label>Sign In: </label>
          <input
            type="text"
            onChange={this.setUserName}
            placeholder="Enter Username"
            maxLength="15"
            />
          <button type="submit">Login</button>
        </form>
        <h2>{this.props.currentUser.name}</h2>
    </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    currentUsersSavedArtists: state.currentUsersSavedArtists
    }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrentUser: (beef) => {
      dispatch({type: "SET CURRENT USER", payload: beef})
    },
    setCurrentUsersArtists: (beef) => {
      dispatch({type: "SET CURRENT USERS ARTISTS", payload: beef})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);
