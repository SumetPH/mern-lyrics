import React, { Component } from "react";
import Navbar from "../components/navbar";
import Axios from "axios";

export class Words extends Component {
  state = {
    words: []
  };

  componentDidMount = () => {
    Axios.get("/word").then(res => {
      this.setState({ words: res.data });
    });
  };

  render() {
    const { words } = this.state;
    const boxs = words.map(word => {
      return (
        <div className="column is-3" key={word._id}>
          <div className="box">
            <h3 style={{ fontSize: "18px" }}>Word : {word.word}</h3>
            <p style={{ fontSize: "14px" }}>Type : {word.wordType}</p>
            <p style={{ fontSize: "14px" }}>Translate : {word.translate}</p>
            <br />
            <img className="image" src={word.image} alt="" />
            <br />
            <p style={{ fontSize: "14px" }}>Sentence : {word.sentence}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="hero is-info is-fullheight">
        <Navbar color="is-info" />
        <div className="hero-body">
          <div className="container">
            <h2 className="title is-3">All Words</h2>
            <div className="columns is-multiline">{boxs}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Words;
