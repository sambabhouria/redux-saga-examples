/* eslint-disable default-case */

import {
  SET_USERNAME,
  REQUEST_SIGN_IN, SUCCESS_SIGN_IN, FAILURE_SIGN_IN,
  SUCCESS_GET_USER,
  SYNC_ADDED_POST, SYNC_REMOVED_POST
} from './actions';

const initial = {
  appMicroblogReducer: {
    status: 'init',
    user: '',
  },
  usersReducer: {},
  postsReducer: {},
};

export const  appMicroblogReducer = (state = initial.appMicroblogReducer, { type, payload }) => {
  switch (type) {
    case REQUEST_SIGN_IN:
      return { ...state, status: 'signin' };
    case SUCCESS_SIGN_IN:
      return { ...state, status: 'username', user: payload.user.user.uid};
    case FAILURE_SIGN_IN:
      return { ...state, status: 'init' };
    case SET_USERNAME:
      return { ...state, status: 'ready' };
  }
  return state;
}

function userEntity(state, { type, payload }) {
  switch (type) {
    case SET_USERNAME:
      return { ...state, username: payload.username };
    case SUCCESS_GET_USER:
      return { ...state, username: payload.data.username };
  }
  return state;
}

export const usersReducer = (state = initial.usersReducer, action) => {
  switch (action.type) {
    case SET_USERNAME:
    case SUCCESS_GET_USER:
      return {
        ...state,
        [action.payload.id]: userEntity(state[action.payload.id], action)
      };
  }
  return state;
}

export const  postsReducer = (state = initial.postsReducer, { type, payload }) => {
  switch (type) {
    case SYNC_ADDED_POST:
      return { ...state, [payload.data.key]: payload.data.val() };
    case SYNC_REMOVED_POST:
      const newState = { ...state };
      delete newState[payload.data.key];
      return newState;
  }
  return state;
}
