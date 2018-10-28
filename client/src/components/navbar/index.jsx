import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

export class Navbar extends Component {
   state = {
      isActive: false
   }
   render() {
      const { color = 'is-primary' } = this.props
      return (
         <nav className={`navbar ${color}`}>
            <div className="navbar-brand">
               <a className="navbar-item" href="/">
                  <img
                     src="https://bulma.io/images/bulma-logo-white.png"
                     alt="Bulma: a modern CSS framework based on Flexbox"
                     width="112"
                     height="28"
                  />
               </a>
               <div
                  onClick={() =>
                     this.setState({ isActive: !this.state.isActive })
                  }
                  className={classnames({
                     'navbar-burger burger': true,
                     'is-active': this.state.isActive
                  })}
                  data-target="navbarExampleTransparentExample">
                  <span />
                  <span />
                  <span />
               </div>
            </div>

            <div
               id="navbarExampleTransparentExample"
               className={classnames({
                  'navbar-menu': true,
                  'is-active': this.state.isActive
               })}>
               <div className="navbar-end">
                  <Link to="/" className="navbar-item">
                     List
                  </Link>
                  <Link to="/words" className="navbar-item">
                     Words
                  </Link>
                  <Link to="/search" className="navbar-item">
                     Search
                  </Link>
               </div>
            </div>
         </nav>
      )
   }
}

export default Navbar
