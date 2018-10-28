import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { toast } from 'react-toastify'

import Navbar from '../components/navbar'

export class Search extends Component {
   state = {
      search: [],
      length: 0,
      isLoading: false
   }

   searchOnEnter = e => {
      if (e.key === 'Enter') {
         axios({
            url: '/youtube',
            method: 'POST',
            data: {
               search: this.refs.search.value,
               length: 10
            }
         }).then(res => {
            console.log(res.data)
            this.setState({ search: res.data, length: 10 })
         })
      }
   }

   searchOnButton = () => {
      axios({
         url: '/youtube',
         method: 'POST',
         data: {
            search: this.refs.search.value,
            length: 10
         }
      }).then(res => {
         console.log(res.data)
         this.setState({ search: res.data, length: 10 })
      })
   }

   moreSearch = () => {
      const { length } = this.state
      this.setState({ isLoading: true })
      axios({
         url: '/youtube',
         method: 'POST',
         data: {
            search: this.refs.search.value,
            length: length + 10
         }
      }).then(res => {
         console.log(res.data)
         this.setState({
            search: res.data,
            length: length + 10,
            isLoading: false
         })
      })
   }

   addSong = details => {
      axios({
         url: '/song',
         method: 'POST',
         data: { details: details, created: new Date() }
      }).then(res => {
         console.log(res.data)
         toast('Add Song Success', {
            position: toast.POSITION.BOTTOM_RIGHT
         })
      })
   }

   searchList = search => {
      return search.map((item, index) => {
         return (
            <div
               onClick={() => this.addSong(item)}
               className="box search"
               key={item.id}>
               <div className="columns">
                  <div className="column is-2 has-text-centered">
                     <img src={item.thumbnails.default.url} alt="" />
                  </div>
                  <div className="column">
                     <p>
                        {index + 1} : {item.title}
                     </p>
                  </div>
               </div>
            </div>
         )
      })
   }
   render() {
      const { search, length, isLoading } = this.state
      return (
         <div className="hero is-danger is-bold is-fullheight">
            <Navbar color="is-danger" />
            <div className="hero-body">
               <div className="container">
                  <div className="column">
                     <h3 className="title is-3">Youtube Search.</h3>
                     <div className="columns">
                        <div className="column">
                           <input
                              className="input is-danger"
                              type="text"
                              onKeyPress={this.searchOnEnter}
                              ref="search"
                           />
                        </div>
                        <div className="column is-2 has-text-centered">
                           <button
                              className="button is-danger "
                              onClick={this.searchOnButton}>
                              Search
                           </button>
                        </div>
                     </div>
                  </div>
                  <div className="column">{this.searchList(search)}</div>
                  <div className="column has-text-centered">
                     {length === 0 ? null : (
                        <button
                           className={classnames({
                              'button is-warning': true,
                              'is-loading': isLoading
                           })}
                           onClick={this.moreSearch}>
                           Load More
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Search
