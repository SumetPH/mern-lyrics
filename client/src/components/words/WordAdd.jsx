import React, { Component } from 'react'
import classnames from 'classnames'
import Axios from 'axios'

export class WordAdd extends Component {
   // state
   state = {
      modal: false,
      wordType: 'n.'
   }

   // method
   addVocab = e => {
      e.preventDefault()
      Axios({
         url: '/word',
         method: 'POST',
         data: {
            songId: this.props.songId,
            word: this.refs.word.value,
            wordType: this.state.wordType,
            translate: this.refs.translate.value,
            image: this.refs.image.value
         }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            this.props.loadWords()
            this.setState({ modal: false })
            this.refs.form.reset()
         }
      })
   }

   render() {
      const { modal, wordType } = this.state
      return (
         <div
            style={{
               display: 'flex',
               justifyContent: 'center',
               color: 'black'
            }}>
            <button
               className="button is-info"
               onClick={() => this.setState({ modal: !modal })}>
               Add Word
            </button>
            <div
               className={classnames({
                  modal: true,
                  'is-active': modal
               })}>
               <div className="modal-background" />
               <div className="modal-card">
                  <header className="modal-card-head">
                     <p className="modal-card-title">Add Word</p>
                     <button
                        className="delete"
                        aria-label="close"
                        onClick={() => this.setState({ modal: !modal })}
                     />
                  </header>
                  <section className="modal-card-body">
                     <form ref="form">
                        <div className="columns">
                           <div className="column">
                              <label>Word</label>
                              <input ref="word" type="text" className="input" />
                           </div>
                           <div className="column">
                              <label>Type</label>
                              <br />
                              <div className="select">
                                 <select
                                    onChange={e =>
                                       this.setState({
                                          wordType: e.target.value
                                       })
                                    }
                                    defaultValue={wordType}>
                                    <option value="n.">Noun</option>
                                    <option value="v.">Verb</option>
                                    <option value="adj.">Adjective</option>
                                    <option value="adv.">Adverb</option>
                                    <option value="prep.">Preposition</option>
                                    <option value="conj.">Conjunction</option>
                                    <option value="pp.">Past Participle</option>
                                    <option value="pt.">Part Tense</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                        <div className="columns">
                           <div className="column">
                              <label>Translate</label>
                              <input
                                 ref="translate"
                                 type="text"
                                 className="input"
                              />
                           </div>
                        </div>
                        <div className="columns">
                           <div className="column">
                              <label>Image</label>
                              <input
                                 ref="image"
                                 type="text"
                                 className="input"
                              />
                           </div>
                        </div>
                     </form>
                  </section>
                  <footer className="modal-card-foot">
                     <button className="button is-info" onClick={this.addVocab}>
                        Save
                     </button>
                     <button
                        className="button"
                        onClick={() => this.setState({ modal: !modal })}>
                        Cancel
                     </button>
                  </footer>
               </div>
            </div>
         </div>
      )
   }
}

export default WordAdd
