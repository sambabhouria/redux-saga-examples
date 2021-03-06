import React, { Component } from 'react';
import { connect } from 'react-redux';
 import { wizardForward, wizardBackward }from '../../core/wizard/actions';
import * as pages from '../pages/wizard';

class Wizard extends Component {
  handleNext() {
    this.props.dispatch(wizardForward());
  }

  handleBack() {
    this.props.dispatch(wizardBackward());
  }

  render() {
    console.log('this.props', this.props)
    const { message } = this.props;
    const { page, canForward, canBackward } = this.props.wizardapp;
    const Page = pages[page];
    return <div style={{ width: '600px' }}>
      <Page />
      <div style={{ color: 'red', fontWeight: 'bold', minHeight: '30px' }}>
        <ul>
          {message.map((msg, index) =>
            <li key={index}>{msg.body}</li>
          )}
        </ul>
      </div>
      <div>
        <div style={{ float: 'left' }}>
          <button disabled={!canBackward} onClick={e => this.handleBack()}>Back</button>
        </div>
        <div style={{ float: 'right' }}>
          <button disabled={!canForward} onClick={e => this.handleNext()}>Next</button>
        </div>
      </div>
    </div>;
  }
}

function select({ wizardapp, message }) {
  return { wizardapp, message };
}

export default connect(select)(Wizard);
