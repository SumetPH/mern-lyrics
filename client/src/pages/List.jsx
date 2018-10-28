import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import Navbar from '../components/navbar'

export class List extends Component {
   state = {
      song: [],
      hover: {}
   }

   componentDidMount = () => {
      Axios.get('/song').then(res => {
         console.log(res.data.doc)
         this.setState({ song: res.data.doc })
      })
   }

   render() {
      const { song } = this.state
      return (
         <div>
            <Navbar />
            <div className="hero is-primary is-fullheight">
               <div className="hero-body">
                  <div className="container">
                     <div className="column">
                        <h3 className="title is-3">Song List</h3>
                        {song.map(item => {
                           return (
                              <div className="column" key={item._id}>
                                 <Link to={`/show/${item._id}`}>
                                    <div className="box list">
                                       <div className="columns">
                                          <div className="column is-2 has-text-centered">
                                             <img
                                                src={
                                                   item.details.thumbnails.high
                                                      .url
                                                }
                                                alt=""
                                             />
                                          </div>
                                          <div className="column">
                                             <p>{item.details.title}</p>
                                             <small>
                                                {item.details.channelTitle}
                                             </small>
                                          </div>
                                       </div>
                                    </div>
                                 </Link>
                              </div>
                           )
                        })}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default List
