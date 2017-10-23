import React from "react"
import styles from './home.css'
// import { browserHistory } from 'react-router'

export default class Home extends React.Component {
//   componentDidMount() {
//     browserHistory.push('/');
//   }

  render() {
    return (
      <div id="home">
        This is the home page.
      </div>
    );
  }
}