import React, { Component } from 'react';
import '../App.css';
import PopularCard from '../presentational/PopularCard';


class PopularContainer extends Component {

  state = {
    popularArtistNames: ["Michael+Jackson", "Drake", "Madonna",
    "Eminem", "Queen", "Ed+Sheeran", "Stevie+Wonder", "Mariah+Carey",
    "Taylor+Swift", "Aretha+Franklin", "Bruno+Mars", "Prince",
    "Kendrick+Lamar", "Beyoncé", "Kanye+West", "Pink+Floyd", "The+Beatles"],
    popularArtists: []
  }

  componentDidMount(){
    const ky = process.env.REACT_APP_LASTFM_API_KEY
    this.state.popularArtistNames.forEach(artist=> {
      return fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist.replace(0, -1)}&api_key=${ky}&format=json`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          popularArtists: [...this.state.popularArtists, data]
        })
      })
    })
  }

  render() {
    return (
      <div>
        <h1 className="searchbar">POPULAR ARTISTS</h1>
        <div className="popular-artist-card">
        { this.state.popularArtists.length === 17 ?
            this.state.popularArtists.map((artist,idx)=> <PopularCard key={idx} {...artist}/>)
          : <h3>Loading...</h3> }
        </div>
    </div>
    );
  }

}


export default PopularContainer;
