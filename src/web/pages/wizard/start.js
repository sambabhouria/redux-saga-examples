import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeEmail } from '../../../core/wizard/actions';

class Start extends Component {
  handleChange(e) {
    const text = e.target.value;
    console.log('input text ', text);
    this.props.dispatch(changeEmail(text));
  }

  render() {
    const { email } = this.props.data;
    console.log('this.props.data', this.data);
    return (
      <div>
        <h2>Start</h2>
        <div>
          Email: <input type="text" value={email} onChange={this.handleChange.bind(this)} />
        </div>
        <dl>
          <dt>OK</dt>
          <dd>ok@example.com</dd>

          <dt>Error</dt>
          <dd>error@example.com, or others</dd>
        </dl>
      </div>
    );
  }
}

function select({ data }) {
  return { data };
}

export default connect(select)(Start);
