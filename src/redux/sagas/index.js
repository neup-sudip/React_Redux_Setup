import { sagaActionTypes } from "./actions";
import { doLogin, doLogout } from "./authSaga";
import { takeLatest, all } from "redux-saga/effects";
import { getUserProfile } from "./userSage";

function* watchGeneralRequest() {
  yield takeLatest(sagaActionTypes.LOGIN, doLogin);
  yield takeLatest(sagaActionTypes.lOGOUT, doLogout);
  yield takeLatest(sagaActionTypes.GET_USER_PROFILE, getUserProfile);
}

export default function* rootSaga() {
  yield all([watchGeneralRequest()]);
}
