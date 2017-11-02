import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import './NavHeader.css'
export default class NavHeader extends React.Component {
  render () {
    return (
      <header className='site-header'>
        <nav className='nav-container'>
          <a href='/main' className='site-name'>Lomo Site</a>
          {/* 导航  */}
          <div className='nav'>
            <ul className='nav-menu'>
              <li>
                <Link className='page-link' to='/photo'> Photo
                </Link>
              </li>
              <li>
                <Link className='page-link' to='/edit'> Edit
                </Link>
              </li>
              <li>
                <Link className='page-link' to='/articleList'> Article
                </Link>
              </li>
              <li>
                <Link className='page-link' to='/contact/'> Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }

}
