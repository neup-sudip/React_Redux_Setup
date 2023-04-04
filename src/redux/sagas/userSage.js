import { call, put } from "redux-saga/effects";

import { setProfile } from "../features/user/userSlice";

import { get } from "../../httpServices";

//import http service

export function* getUserProfile({ type, payload }) {
  try {
    const { data } = yield call(get, payload);
    yield put(setProfile(data));
  } catch (error) {
    console.log(error);
    yield put(setProfile({ data: null }));
  }
}
