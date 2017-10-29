import React from 'react'


export default class Footer extends React.Component{

    render(){
        return(
            <footer>
            <nav>
                <ul className="footer-nav">
                <li className="nav-item"><a href="">About</a></li>
                <li className="nav-item"><a href="">FAQs</a></li>
                <li className="nav-item"><a href="/contact/">Contact</a></li>
                <li className="nav-item"><a href="">Support</a></li>
                <li className="nav-item"><a href="">Terms &amp; Policies</a></li> 
                </ul>
            </nav>
            <p className="colophon">
                © 2016 Lomo Yeung
            </p>
            </footer>
        )

    }

}
