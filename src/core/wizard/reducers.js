/* eslint-disable default-case */
import {
  UPDATE_PAGE, UPDATE_NAVIGATION, CHANGE_EMAIL, CHANGE_TOKEN,
  MESSAGE_ADD, MESSAGE_REMOVE
} from './actions';

const initial = {
  wizardapp: {
    page: 'start',
    canForward: false,
    canBackward: false,
  },
  data: {},
  message: [],
};

export const  wizardapp = (state = initial.wizardapp, { type, payload }) => {
  switch (type) {
    case UPDATE_PAGE:
      return { ...state, page: payload };
    case UPDATE_NAVIGATION:
      return { ...state, canForward: payload.forward, canBackward: payload.backward };
  }
  return state;
}

export const  data = (state = initial.data, { type, payload }) => {
  switch (type) {
    case CHANGE_EMAIL:
      return { ...state, email: payload };
    case CHANGE_TOKEN:
      return { ...state, token: payload };
  }
  return state;
}

export const  message = (state = initial.message, { type, payload }) => {
  switch (type) {
    case MESSAGE_ADD:
      return [ ...state, payload ];
    case MESSAGE_REMOVE:
      return state.filter(m => m.id !== payload);
  }
  return state;
}
