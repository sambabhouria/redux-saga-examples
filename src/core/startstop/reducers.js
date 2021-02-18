/* eslint-disable default-case */
import {
  INCREMENT, RECORD_STATS, ONLINE, OFFLINE
} from './actions';

const initial = {
    startStopappReducer: {
    count: 0,
    status: true
  },
  statsReducer: {
    history: []
  }
};

export const startStopappReducer = (state = initial.startStopappReducer, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case ONLINE:
      return { ...state, status: true };
    case OFFLINE:
      return { ...state, status: false };
  }
  return state;
};

export const  statsReducer = (state = initial.statsReducer, { type, payload }) =>{
  switch (type) {
    case RECORD_STATS:
      return { ...state, history: [...state.history, payload] };
  }
  return state;
};
