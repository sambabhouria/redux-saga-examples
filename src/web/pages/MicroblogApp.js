/* eslint-disable default-case */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SignIn, Timeline } from './microblog/page';

class MicroblogApp extends Component {
  page() {
    const { appMicroblogReducer: { status } } = this.props;
    switch (status) {
    case 'init':
    case 'signin':
    case 'username':
      return <SignIn />;
    case 'ready':
      return <Timeline />;
    }
    return <div>404 Not Found :(</div>;
  }

  render() {
    const { appMicroblogReducer } = this.props;
    return (
      <section>
        <h1>
          <a href="https://github.com/sambabhouria">
            Microblog</a> from <a href="https://github.com/sambabhouria">
              redux-saga-examples</a> by <a href="https://twitter.com/sambabhouria">@sambabhouria</a>
        </h1>
        {this.page()}
      </section>
    );
  }
}

function select({ appMicroblogReducer }) {
  return { appMicroblogReducer };
}

export default connect(select)(MicroblogApp);
