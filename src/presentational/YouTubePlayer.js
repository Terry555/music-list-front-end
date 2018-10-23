import React, { Component } from 'react';
import '../App.css';
import YouTube from 'react-youtube';
import ytsearch from 'youtube-search';
import { connect } from 'react-redux';


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
        ytsearch(`${this.props.oneArtist.artist.name} music`, opts).then(data => {
          const videoArray = data.results.filter(data => data.kind === "youtube#video")
          this.setState({
            videoId: videoArray[0].id
          })
        })
  }

  componentDidUpdate() {
        ytsearch(`${this.props.oneArtist.artist.name} music`, opts).then(data => {
          const videoArray = data.results.filter(data => data.kind === "youtube#video")
          if (this.state.videoId !== videoArray[0].id) {
          this.setState({
            videoId: videoArray[0].id
          })
        }
        })
    // console.log(searchResults)
  }



  render() {
    const playerOpts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    return (
      <div>
        {this.state.videoId ?
          <YouTube
            videoId={this.state.videoId}
            playerOpts={playerOpts}
            />
          :
          <h2>...Loading</h2>
        }
      </div>
    );


    // onReady={this._onReady}

        // {_onReady(event)
    //   // access to player in all event handlers via event.target
    //   event.target.pauseVideo(); }

}

}

function mapStateToProps(state){
  return {
    oneArtist: state.oneArtist
  }
}


export default connect(mapStateToProps)(YouTubePlayer);
