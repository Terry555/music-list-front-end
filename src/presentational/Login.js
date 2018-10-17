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
  }).then(response=>response.json()).catch((error)=> {console.log(error)})
  .then(json=> {
    if (json.errors[0] === "Name has already been taken") {
      alert(json.errors[0])
    }
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
       this.props.setCurrentUsersRecommendations(recommendedArtistArray)
     }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit} className="ui form">
          <div className="field">
          <label>Create Username: </label>
          <input
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
        <form onSubmit={this.displayUsers} className="ui form">
          <div className="field">
          <label>Sign In: </label>
          <input
            type="text"
            onChange={this.setUserName}
            placeholder="Enter Username"
            maxLength="15"
            />
        </div>
          <button className="ui tiny pink button" type="submit">Login</button>
        </form>
        <h2>{this.props.currentUser.name}</h2>
    </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    currentUsersRecommendations: state.currentUsersRecommendations
    }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrentUser: (beef) => {
      dispatch({type: "SET CURRENT USER", payload: beef})
    },
    setCurrentUsersRecommendations: (beef) => {
      dispatch({type: "SET CURRENT USERS RECOMMENDATIONS", payload: beef})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);
