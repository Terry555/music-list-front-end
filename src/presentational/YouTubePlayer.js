import React, { Component } from 'react';
import '../App.css';
import YouTube from 'react-youtube';
// import { YTSearch } from 'yt-search';


class YouTubePlayer extends Component {

  ytSearch = require('yt-search')


  const ytSearch("pink", function = (err,r) => {
    if (err) throw err

    const videos = r.videos
    const playlists = r.playlists
    const accounts = r.accounts

    const firstResult = videos[0]
    console.log(firstResult)
  })
  render() {

//     const opts = {
//       height: '390',
//       width: '640',
//       playerVars: { // https://developers.google.com/youtube/player_parameters
//         autoplay: 1
//       }
//
// }

    return (
      <div onClick={this.ytSearch}>
        TESTING FROM YOUTUBE PLAYER
      </div>
    );
  }
  // <YouTube
  //   videoId="oOlDewpCfZQ"
  //   opts={opts}
  //   onReady={this._onReady}
  //   />

  // _onReady(event) {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // }

}


export default YouTubePlayer;
