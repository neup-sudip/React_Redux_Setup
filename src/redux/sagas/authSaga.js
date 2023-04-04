import { call, put } from "redux-saga/effects";
import { login, logout } from "../features/auth/authSlice";
import { setProfile } from "../features/user/userSlice";

import { post } from "../../httpServices";

//import http service
//payload has {url: "", data: ""}

export function* doLogin({ type, payload }) {
  try {
    const { data } = yield call(post, payload);
    console.log(data);
    yield put(login(data));
  } catch (error) {
    console.log(error);
    yield put(login({ result: false, message: "Can not login" }));
  }
}

export function* doLogout({ type, payload }) {
  try {
    const { data } = yield call(post, payload);
    yield put(logout(data));
    yield put(setProfile({ data: null }));
  } catch (error) {
    console.log(error);
    yield put(setProfile({ data: null }));
    yield put(login({ result: true }));
  }
}
