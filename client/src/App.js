import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './assets/css/ReactToastify.css'

import List from './pages/List'
import Show from './pages/Show'
import Search from './pages/Search'

class App extends Component {
   render() {
      return (
         <Router>
            <div>
               <ToastContainer />
               <Route exact path="/" component={List} />
               <Route path="/show/:id" component={Show} />
               <Route path="/search" component={Search} />
            </div>
         </Router>
      )
   }
}

export default App
