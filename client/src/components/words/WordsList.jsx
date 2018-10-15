import React from 'react'
import WordAdd from './WordAdd'
import WordEdit from './WordEdit'

const WordsList = ({ songId, words, loadWords, deleteWord }) => {
   return (
      <div>
         {words.map(word => {
            return (
               <div
                  key={word._id}
                  className="box"
                  style={{ backgroundColor: '#4a4a4a', color: 'white' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
                     {word.word}{' '}
                     <span style={{ fontWeight: 'normal', fontSize: '12px' }}>
                        ({word.wordType})
                     </span>
                  </p>
                  <small>{word.translate}</small>
                  <div className="image is-16by9">
                     <img src={word.image} alt="" />
                  </div>
                  <div style={{ display: 'flex' }}>
                     <WordEdit
                        wordId={word._id}
                        word={word}
                        loadWords={loadWords}
                     />
                     <button
                        className="button is-danger is-small"
                        style={{ margin: '0.5rem' }}
                        onClick={() => deleteWord(word._id)}>
                        Del.
                     </button>
                  </div>
               </div>
            )
         })}
         <div className="column">
            <WordAdd songId={songId} loadWords={loadWords} />
         </div>
      </div>
   )
}

export default WordsList
