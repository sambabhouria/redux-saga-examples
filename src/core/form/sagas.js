import { call, fork, take, put } from 'redux-saga/effects';
import { REQUEST_SUBMIT, successSubmit, failureSubmit } from './actions';

function submit(data) {
  // Dummy API calling
  console.log('$$$ this is the saga middleware $$$$')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('done')
      resolve({ data: 'done' });
    }, 2000);
  })
    .then(data => ({ data }))
    .catch(error => ({ error }));
}

function* handleSubmit() {
  const { payload: { values, resolve, reject } } = yield take(REQUEST_SUBMIT);
  const { data, error } = yield call(submit, values);
  if (data && !error) {
    resolve();
    yield put(successSubmit({ data }));
  } else {
    reject();
    yield put(failureSubmit({ error }));
  }
}

export default function* formRootSaga() {
  console.log('$$$ IN THE SAGA HANDLER$$$ by formRootSaga()');
  yield fork(handleSubmit);
}
