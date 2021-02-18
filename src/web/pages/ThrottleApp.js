
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSomething, toggleProducer, incrementLimit, decrementLimit }   from '../../core/throttle/actions';

class ThrottleApp extends Component {
  componentDidMount() {
    setInterval(() => {
      const { dispatch, throttleAppReducer: { producer } } = this.props;

      if (producer) {
        this.props.dispatch(requestSomething());
      }
    }, 500);
  }

  handleToggle() {
    this.props.dispatch(toggleProducer());
  }

  handleIncrementLimit() {
    this.props.dispatch(incrementLimit());
  }

  handleDecrementLimit() {
    this.props.dispatch(decrementLimit());
  }

  render() {
    const { throttleAppReducer, throttleReducer } = this.props;
    return (
      <div>
        <h1>
          <a href="https://github.com/sambabhouria">Throttle
          </a> from <a href="https://github.com/sambabhouria">redux-saga-examples</a>
          by <a href="https://twitter.com/sambabhouria">@sambabhouria</a>
        </h1>
        <div>
          Task Producer: { throttleAppReducer.producer ? 'On' : 'Off' }
          <span>&nbsp;</span>
          <input type="button" value="Toggle" onClick={this.handleToggle.bind(this)} />
        </div>
        <div>
          Limit: {throttleReducer.limit}
          <span>&nbsp;</span>
          <input type="button" value="+" onClick={this.handleIncrementLimit.bind(this)} />
          <span>&nbsp;</span>
          <input type="button" value="-" onClick={this.handleDecrementLimit.bind(this)} />
        </div>
        <div>
          <ul className="tasks">
            {throttleReducer.jobs.map(job => (
              <li key={job.id} className={job.status}>{job.id}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function select({ throttleAppReducer, throttleReducer }) {
  return { throttleAppReducer, throttleReducer };
}

export default connect(select)(ThrottleApp);
