import { all, fork } from "redux-saga/effects";
import autocompleteRootSaga from "../autocomplete/sagas";
import formRootSaga from "../form/sagas";
import rootMicroblogSaga from "../microblog/sagas";
import rootStartStopSaga from "../startstop/sagas";
import rootTakexSaga from "../takex/sagas";
import rootThrottleSaga from "../throttle/sagas";
import rootWizardSaga from "../wizard/sagas";


export default function* rootSaga() {
  yield all([fork(autocompleteRootSaga)]);
  yield all([fork(formRootSaga)]);
  yield all([fork(rootMicroblogSaga)]);
  yield all([fork(rootStartStopSaga)]);
  yield all([fork(rootTakexSaga)]);
  yield all([fork(rootThrottleSaga)]);
  yield all([fork(rootWizardSaga)]);
}
