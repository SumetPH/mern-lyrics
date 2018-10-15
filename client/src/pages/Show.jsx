import React, { Component } from 'react'
import axios from 'axios'
import Iframe from 'react-iframe'

import Lyrics from '../components/song/Lyrics'
import WordsList from '../components/words/WordsList'

class Show extends Component {
   state = {
      song: [],
      lyrics: '',
      youtubeId: '',
      showEditor: false,
      words: []
   }

   componentDidMount = () => {
      this.loadSong()
      this.loadWords()
   }

   loadSong = () => {
      axios.get(`/song/${this.props.match.params.id}`).then(res => {
         this.setState({
            song: res.data.song,
            lyrics: res.data.lyrics,
            youtubeId: res.data.youtubeId
         })
      })
   }

   loadWords = () => {
      axios.get(`/word/${this.props.match.params.id}`).then(res => {
         console.log(res.data)
         this.setState({ words: res.data.words })
      })
   }

   handleChange = lyrics => {
      this.setState({ lyrics })
   }

   handleEditor = () => {
      this.setState({ showEditor: !this.state.showEditor })
   }

   updateLyrics = () => {
      const { lyrics } = this.state
      axios({
         url: '/lyrics',
         method: 'PUT',
         data: {
            _id: this.state.song._id,
            lyrics: lyrics
         }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            this.setState({ showEditor: false })
         }
      })
   }

   deleteWord = idWord => {
      if (window.confirm('Would you like to delete it.')) {
         axios({
            url: '/word',
            method: 'DELETE',
            data: {
               idWord: idWord
            }
         }).then(res => {
            console.log(res.data)
            this.loadWords()
         })
      }
   }

   render() {
      return (
         <div className="m" style={{ backgroundColor: '#4a4a4a' }}>
            <div className="blockA" style={{ backgroundColor: '#4a4a4a' }}>
               <div
                  style={{
                     height: '40%',
                     width: '100%',
                     display: 'flex',
                     justifyContent: 'center',
                     padding: '1rem'
                  }}>
                  <Iframe
                     className="box has-background-dark has-text-light"
                     url={
                        this.state.youtubeId === ''
                           ? ''
                           : `https://www.youtube.com/embed/${
                                this.state.youtubeId
                             }`
                     }
                     position="static"
                  />
               </div>
               <div
                  style={{
                     height: '60%',
                     padding: '1rem'
                  }}>
                  <div
                     className="box has-background-dark has-text-light"
                     style={{ height: '100%', overflow: 'auto' }}>
                     <Lyrics
                        lyrics={this.state.lyrics}
                        showEditor={this.state.showEditor}
                        handleEditor={this.handleEditor}
                        handleChange={this.handleChange}
                        updateLyrics={this.updateLyrics}
                     />
                  </div>
               </div>
            </div>
            <div className="blockB" style={{ backgroundColor: '#4a4a4a' }}>
               <div
                  className="box has-background-dark has-text-light"
                  style={{
                     height: '100%',
                     overflow: 'auto'
                  }}>
                  <WordsList
                     songId={this.state.song._id}
                     words={this.state.words}
                     loadWords={this.loadWords}
                     deleteWord={this.deleteWord}
                  />
               </div>
            </div>
         </div>
      )
   }
}

export default Show
