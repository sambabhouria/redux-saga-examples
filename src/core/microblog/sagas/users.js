/* eslint-disable require-yield */
import { call, put, fork, take, takeEvery } from 'redux-saga/effects';
import firebase from "../../firebase"
import {
  SET_USERNAME, SYNC_ADDED_POST,
  REQUEST_UPSERT_USER, requestUpsertUser, successUpsertUser, failureUpsertUser,
  REQUEST_GET_USER, requestGetUser, successGetUser, failureGetUser
} from '../actions';

const db = firebase.ref("/users");

function* runUpsert({ payload: { id, username } }) {
  console.log('db app', db);

  /*
    In this chapter, we will show you how to save your data to Firebase.
      ***** Set ******
      The set method will write or replace data on a specified path. Let us create a reference to the users’s collection and set two users.
      const db = firebase.ref("/users");
        db.set ({
        John: {
          number: 1,
          age: 30
        },
        Amanda: {
          number: 2,
          age: 20
        }
      });
     ***** Update ******
     We can update the Firebase data in a similar fashion. Notice how we are using the user/john path.
      var johnRef = firebase.ref("users/John");
      johnRef.update ({
          "number": 10
      });
    ***** Sometimes you need to have a unique identifier for your data ******
    ***** When you want to create unique identifiers for your data, you need to use the push method instead of the set method. ******
    ****The Push Method ******
    The push() method will create a unique id when the data is pushed. If we want to create our players from the previous chapters with a unique id, we could use the code snippet given below.
  */

  // const error = yield call(db.update, 'users', id, { username });
  const error = yield call(db.update, 'users', id, { username });
  if (!error) {
    yield put(successUpsertUser());
  } else {
    yield put(failureUpsertUser());
  }
}

function* upsert() {
  // yield* takeEvery(REQUEST_UPSERT_USER, runUpsert);
  yield takeEvery(REQUEST_UPSERT_USER, runUpsert);
}

function* runGet({ payload: { id } }) {
  const user = yield call(db.get, 'users', id);
  if (user) {
    yield put(successGetUser({ id, data: user }));
  } else {
    yield put(failureGetUser());
  }
}

function* get() {
  // yield* takeEvery(REQUEST_GET_USER, runGet);
  yield takeEvery(REQUEST_GET_USER, runGet);
}

function* triggerUpsertUser() {
  while (true) {
    let { payload: { id, username } } = yield take(SET_USERNAME);
    if (!username || username.length === 0) {
      id = '@@anonymous';
      username = 'Anonymous';
    }
    yield put(requestUpsertUser({ id, username }));
  }
}

function* triggerGetUser() {
  while (true) {
    const { payload: { data } } = yield take(SYNC_ADDED_POST);
    const post = data.val();
    yield put(requestGetUser({ id: post.userId }));
  }
}

export default function* rootSaga() {
  yield fork(upsert);
  yield fork(get);

  yield fork(triggerUpsertUser);
  yield fork(triggerGetUser);
}
