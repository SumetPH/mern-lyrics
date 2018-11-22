import React, { Component } from "react";
import classnames from "classnames";
import Axios from "axios";

export class WordEdit extends Component {
  // state
  state = {
    modal: false
  };

  // method
  editWord = e => {
    e.preventDefault();

    Axios({
      url: "/word",
      method: "put",
      data: {
        wordId: this.props.wordId,
        word: this.refs.word.value,
        wordType: this.refs.wordType.value,
        translate: this.refs.translate.value,
        sentence: this.refs.sentence.value,
        image: this.refs.image.value
      }
    }).then(res => {
      if (res.data.msg === "Success") {
        this.props.loadWords();
        this.setState({ modal: false, type: "n." });
      }
    });
  };

  render() {
    const { modal } = this.state;
    const { word } = this.props;
    return (
      <div style={{ color: "black" }}>
        <button
          className="button is-success is-small"
          style={{ margin: "0.5rem" }}
          onClick={() => this.setState({ modal: !modal })}
        >
          Edit
        </button>
        <div
          className={classnames({
            modal: true,
            "is-active": modal
          })}
        >
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Word</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => this.setState({ modal: !modal, type: "n." })}
              />
            </header>
            <section className="modal-card-body">
              <form ref="form">
                <div className="columns">
                  <div className="column">
                    <label>Word</label>
                    <input
                      ref="word"
                      type="text"
                      className="input"
                      defaultValue={word.word}
                    />
                  </div>
                  <div className="column">
                    <label>Type</label>
                    <br />
                    <div className="select">
                      <select ref="wordType" defaultValue={word.wordType}>
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
                      defaultValue={word.translate}
                    />
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <label>Sentence</label>
                    <textarea
                      className="textarea"
                      ref="sentence"
                      defaultValue={word.sentence}
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
                      defaultValue={word.image}
                    />
                  </div>
                </div>
              </form>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={this.editWord}>
                Save
              </button>
              <button
                className="button"
                onClick={() => {
                  this.setState({ modal: !modal });
                }}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default WordEdit;
