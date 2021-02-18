
import React, { Component } from 'react';
import { connect } from 'react-redux';

class TakexApp extends Component {
  handleClick(type) {
    this.props.dispatch({ type });
  }

  render() {
    return <div>
      <h1>
        <a href="https://github.com/sambabhouria">
          TakeX</a> from <a href="https://github.com/sambabhouria">redux-saga-examples</a>
          by <a href="ttps://twitter.com/sambabhouria">@sambabhouria</a>
      </h1>
      <h3>Please open <i>JavaScript Console</i> and click following buttons.</h3>
      <ul>
        <li><button onClick={e => this.handleClick('FETCH_USERS')}>FETCH_USERS</button></li>
        <li><button onClick={e => this.handleClick('FETCH_POSTS')}>FETCH_POSTS</button></li>
        <li><button onClick={e => this.handleClick('FETCH_NEWS')}>FETCH_NEWS</button></li>
        <li><button onClick={e => this.handleClick('SELECT_USER')}>SELECT_USER</button></li>
        <li><button onClick={e => this.handleClick('UNSELECT_USER')}>UNSELECT_USER</button></li>
      </ul>
    </div>;
  }
}

function select({ takexapReducer }) {
  return { takexapReducer};
}

export default connect(select)(TakexApp);
