import React, { Component } from 'react';
import '../App.css';
import YouTube from 'react-youtube';
import ytsearch from 'youtube-search';

const ky = process.env.REACT_APP_YOUTUBE_API_KEY
// const ytsearch = require('youtube-search');
const opts = {maxResults: 10, key: ky}

class YouTubePlayer extends Component {

    constructor(props){
      super(props)
      this.state = {
        videoId: '',
      }
      ytsearch.bind(this)
    }


  componentDidMount() {
        ytsearch('cardi b music', opts).then(data => {
          console.log(data)
          this.setState({
            videoId: data.results[0].id
          })
        })
    // console.log(searchResults)

  }



  render() {
    console.log(this.state)


    const playerOpts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }



    return (
      <div>
        TESTING FROM YOUTUBE PLAYER
        {this.state.videoId ?
          <YouTube
            videoId={this.state.videoId}
            playerOpts={playerOpts}
            onReady={this._onReady}
            />
          :
          null
        }
      </div>
    );


    // {_onReady(event)
    //   // access to player in all event handlers via event.target
    //   event.target.pauseVideo(); }

}

}


export default YouTubePlayer;
