import React from 'react'
import ReactHtmlparser from 'react-html-parser'
import ReactQuill from 'react-quill'

const Lyrics = ({
   lyrics,
   showEditor,
   handleEditor,
   handleChange,
   updateLyrics
}) => {
   return (
      <div>
         <div>{ReactHtmlparser(lyrics)}</div>
         <hr />
         <button
            className="button is-warning is-fullwidth"
            onClick={handleEditor}>
            Show/Hide
         </button>
         {showEditor ? (
            <div>
               <button
                  className="button is-primary is-fullwidth"
                  onClick={updateLyrics}>
                  Save
               </button>
               <ReactQuill class onChange={handleChange} value={lyrics} />
            </div>
         ) : null}
      </div>
   )
}

export default Lyrics
