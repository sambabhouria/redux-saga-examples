import { fork, call, put, take, select } from 'redux-saga/effects';
// import firebase from 'firebase';
import { auth } from "../../firebase"
// import firebase from "../../firebase"

import {
  REQUEST_SIGN_IN, successSignIn, failureSignIn,
  REQUEST_USERNAME, requestUsername, setUsername,
} from '../actions';

function signIn() {
  console.log('in the firebase function')
  return   auth.signInAnonymously()
  .then(user => ({ user }))
  .catch(error => ({ error }));
}

function* handleRequestSignIn() {
  while (true) {
    yield take(REQUEST_SIGN_IN);
    const { user, error } = yield call(signIn);
    if (user && !error) {
      console.log("🚀 ", user)
      yield put(successSignIn({ user }));
      yield put(requestUsername());
    } else {
      yield put(failureSignIn({ error }));
    }
  }
}

function* handleRequestUsername() {
  while (true) {
    yield take(REQUEST_USERNAME);
    console.log('request user name')
    const username = prompt('Please input username or anonymous');
    const id = yield select(state => state.appMicroblogReducer.user);
    yield put(setUsername({ id, username }));
  }
}

export default function* rootSaga() {
  yield fork(handleRequestUsername);
  yield fork(handleRequestSignIn);
}
