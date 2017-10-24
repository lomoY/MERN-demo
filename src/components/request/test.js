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
        alert(res)
       
      });
  }

  render() {
    return (
      <div>
        <h1>这就是用来测试的</h1>
        <h1>{`/r/${this.props.subreddit}`}</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
      </div>
    );
  }
}
