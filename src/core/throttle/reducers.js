import {
  NEW_JOB, RUN_JOB, SUCCESS_JOB, FAILURE_JOB,
  TOGGLE_PRODUCER, INCREMENT_LIMIT, DECREMENT_LIMIT
} from './actions';
import * as throttleSelector from './selectors/throttle';

const initial = {
    throttleAppReducer: {
    producer: true
  },
  throttleReducer: {
    jobs: [],
    limit: 3
  },
};

function swapJob(list, newJob) {
  let pos = list.findIndex(job => job.id === newJob.id);
  return [ ...list.slice(0, pos), newJob, ...list.slice(pos + 1) ];
}

const handlers = {
    throttleAppReducer: {
    [TOGGLE_PRODUCER]: state => {
      return { ...state, producer: !state.producer };
    },
  },
  throttleReducer: {
    [NEW_JOB]: (state, action) => {
      return { ...state, jobs: [ ...state.jobs, action.payload ] };
    },
    [RUN_JOB]: (state, action) => {
      const job = throttleSelector.job(action.payload.id)({ throttleReducer: state });
      const newJob = { ...job, status: 'running' };
      return { ...state, jobs: swapJob(state.jobs, newJob) };
    },
    [SUCCESS_JOB]: (state, action) => {
      const job = throttleSelector.job(action.payload.id)({ throttleReducer: state });
      const newJob = { ...job, status: 'success' };
      return { ...state, jobs: swapJob(state.jobs, newJob) };
    },
    [FAILURE_JOB]: (state, action) => {
      const job = throttleSelector.job(action.payload.id)({ throttleReducer: state });
      const newJob = { ...job, status: 'failure' };
      return { ...state, jobs: swapJob(state.jobs, newJob) };
    },
    [INCREMENT_LIMIT]: state => {
      return { ...state, limit: state.limit + 1 };
    },
    [DECREMENT_LIMIT]: state => {
      if (0 < state.limit) {
        return { ...state, limit: state.limit - 1 };
      } else {
        return state;
      }
    }
  }
};

export const  throttleReducer = (state = initial.throttleReducer, action) => {
  const handler = handlers.throttleReducer[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

export const  throttleAppReducer =(state = initial.throttleAppReducer, action) =>{
  const handler = handlers.throttleAppReducer[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}
