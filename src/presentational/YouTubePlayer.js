import React, { Component } from 'react';
import '../App.css';
import YouTube from 'react-youtube';

const ky = process.env.REACT_APP_YOUTUBE_API_KEY
const ytsearch = require('youtube-search');
const opts = {maxResults: 10, key: ky}

class YouTubePlayer extends Component {

    constructor(){
      super()
      this.state = {
        videoId: '',
      }
    }


  render() {

    ytsearch('my chemical romance', opts, function(err, results){
      if(err) return console.log(err);
      console.log(this)
      this.setState({
        videoId: results[3].id
      })
    })

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
