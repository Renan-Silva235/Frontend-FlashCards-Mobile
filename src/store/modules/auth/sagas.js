import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../config/api";
import * as types from "./types";
import { signInSuccess, signInFailure } from "./actions";
import { loadProfileSuccess } from "./actions";
import showApiError from "../../../utils/showApiError";

export function* signIn({ payload }) {
  try {
    yield AsyncStorage.removeItem("@FlashCards:token");

    const { email, password } = payload;

    const response = yield call(api.post, "/auth/login", {
      email,
      password,
    });
    const { token, user } = response.data;

    yield AsyncStorage.setItem("@FlashCards:token", token);

    yield put(signInSuccess(token, user));
  } catch (error) {
    yield put(signInFailure());

    showApiError(error, "Erro no login");
  }
}

export function* signOutEffect() {
  yield AsyncStorage.removeItem("@FlashCards:token");
}

export function* loadProfile() {
  try {
    const token = yield select((state) => state.auth.token);
    const user = yield select((state) => state.auth.user);

    const response = yield call(api.get, `/auth/profile/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(loadProfileSuccess(response.data));
  } catch (err) {
    console.log("Erro ao carregar perfil:", err?.response?.data || err.message);
  }
}

export default all([
  takeLatest(types.SIGN_IN_REQUEST, signIn),
  takeLatest(types.SIGN_OUT, signOutEffect),
  takeLatest(types.LOAD_PROFILE_REQUEST, loadProfile),
]);
