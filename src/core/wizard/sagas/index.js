import { fork } from 'redux-saga/effects';
import message from './message';
import wizard from './wizard';

export default function* rootWizardSaga() {
  yield fork(message);
  yield fork(wizard);
}
