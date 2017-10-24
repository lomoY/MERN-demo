import React, { Component} from 'react'
import './NavHeader.css'
import FetchDemo from './request/test'
export default class NavHeader extends React.Component{
        render(){
            return(
                
                <header className="site-header">
                    <FetchDemo/>
                    <nav className="nav-container">
                        <a href="/main" className="site-name">Lomo Site</a>
                        {/* 导航  */}
                        <div className="nav">
                            <ul className="nav-menu">
                                <li>    
                                    <a className="page-link" href="/article/">Article</a>
                                </li>
                                <li>
                                    <a className="page-link" href="/contact/">Contact</a>
                                </li> 
                            </ul>
                        </div>
                    </nav>
                </header>
        )
    }

}

