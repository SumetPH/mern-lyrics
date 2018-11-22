import React from "react";
import ReactHtmlparser from "react-html-parser";
import ReactQuill from "react-quill";

const Lyrics = ({
  lyrics,
  showEditor,
  handleEditor,
  handleChange,
  updateLyrics
}) => {
  return (
    <div>
      <div className="strong">{ReactHtmlparser(lyrics)}</div>
      <hr />
      <button className="button is-warning is-fullwidth" onClick={handleEditor}>
        Show/Hide
      </button>
      {showEditor ? (
        <div>
          <ReactQuill
            className="has-background-light has-text-dark"
            onChange={handleChange}
            value={lyrics}
          />
          <button
            className="button is-primary is-fullwidth"
            onClick={updateLyrics}
          >
            Save
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Lyrics;
