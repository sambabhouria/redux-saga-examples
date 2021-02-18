import { call, put, fork, take, delay } from 'redux-saga/effects';
import {
  REQUEST_SUGGEST, successSuggest, failureSuggest
} from './actions';
import API from './api';

function* runRequestSuggest(text) {
  const { data, error } = yield call(API.suggest, text);
  if (data && !error) {
    yield put(successSuggest({ data }));
  } else {
    yield put(failureSuggest({ error }));
  }
}

function createLazily(msec = 100) {
  let ongoing;
  return function* (task, ...args) {
    if (ongoing && ongoing.isRunning()) {
      ongoing.cancel();
    }
    ongoing = yield fork(function* () {
      yield delay(msec)
      yield fork(task, ...args);
    });
  }
}

function* handleRequestSuggest() {
  const lazily = createLazily();
  while (true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    yield fork(lazily, runRequestSuggest, payload);
  }
}

export default function* autocompleteRootSaga() {
  console.log('$$$ IN THE SAGA HANDLER$$$ by autocompleteRootSaga()');
  yield fork(handleRequestSuggest);
}
