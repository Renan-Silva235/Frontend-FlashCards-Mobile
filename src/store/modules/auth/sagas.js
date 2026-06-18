import { takeLatest, call, put, all } from "redux-saga/effects";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../config/api";
import * as types from "./types";
import { signInSuccess, signInFailure } from "./actions";

export function* signIn({ payload }) {
  try {
    yield AsyncStorage.removeItem("@FlashCards:token");

    const { email, password } = payload;

    const response = yield call(api.post, "/auth/login", {
      email,
      password,
    });

    console.log("========== SUCESSO ==========");
    console.log("STATUS:", response.status);
    console.log("DATA:", response.data);

    const { token, user } = response.data;

    yield AsyncStorage.setItem("@FlashCards:token", token);

    yield put(signInSuccess(token, user));
  } catch (error) {
    console.log("========== ERRO LOGIN ==========");

    console.log("MESSAGE:", error.message);

    if (error.response) {
      console.log("STATUS:", error.response.status);
      console.log("DATA:", error.response.data);
      console.log("HEADERS:", error.response.headers);
    }

    if (error.request) {
      console.log("REQUEST:", error.request);
    }

    console.log("ERROR:", error);

    yield put(signInFailure());

    Alert.alert(
      "Erro no login",
      error.response?.data?.message ||
        error.message ||
        "Verifique seus dados ou a conexão com o servidor."
    );
  }
}

export function* signOutEffect() {
  yield AsyncStorage.removeItem("@FlashCards:token");
}

export default all([
  takeLatest(types.SIGN_IN_REQUEST, signIn),
  takeLatest(types.SIGN_OUT, signOutEffect),
]);