import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


class Login extends Component {

  state = {
    userName: '',
    allUsers: [],
    selectedUser: {name: "", id: ""}
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
       this.props.setCurrentUsersArtists(selectedUser.artists)
       const recommendedArtistArray = []
       selectedUser.artists.forEach(artist => artist.recommended_artists.forEach(artist => recommendedArtistArray.push(artist)))
       this.props.setCurrentUsersRecommendations(recommendedArtistArray)
     }
     else {
       alert("Username doesn't exist!")
     }
  }

  render() {
    return (
      <div className="login">
      <div>
        <div className="one column row">
        <form onSubmit={this.displayUsers} className="ui form">
          <div className="field">
          <label id="otherBars" className="login-font">Sign In: </label>
          <input
            style={{width: "300px"}}
            type="text"
            onChange={this.setUserName}
            placeholder="Enter Username"
            maxLength="15"
            />
        </div>
          <button className="ui tiny pink button" type="submit">Login</button>
        </form>
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



export default connect(mapStateToProps, mapDispatchToProps)(Login);
