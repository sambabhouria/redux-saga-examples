import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { requestSubmit } from '../../core/form/actions';

class FormComponent extends Component {
  handleSubmit(values) {
    return new Promise((resolve, reject) => {
      console.log('subit ted values', values);
      this.props.dispatch(requestSubmit({ values, resolve, reject }));
    });
  }

  render() {
    return <section>
      <h1>
        <a href="https://github.com/sambabhouria">Form</a> from
        <a href="https://github.com/sambabhouria">redux-saga-examples
        </a> by <a href="https://twitter.com/sambabhouria">@sambabhouria</a>
      </h1>
      <Form onSubmit={this.handleSubmit.bind(this)} />
    </section>;
  }
}

export default connect()(FormComponent);
