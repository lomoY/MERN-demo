import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get(`/wines/`)
      .then(res => {
          console.log(res)     
      });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
