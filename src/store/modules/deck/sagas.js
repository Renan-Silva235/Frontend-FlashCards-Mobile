import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { Alert } from "react-native";
import api from "../../../config/api";
import {
  loadDecksRequest,
  loadDecksSuccess,
  createDeckSuccess,
  toggleFavoriteSuccess,
  deckFailure,
} from "./actions";
import { loadProfileRequest } from "../auth/actions";
import showApiError from "../../../utils/showApiError";

export function* loadDecks() {
  try {
    const token = yield select((state) => state.auth.token);
    const user = yield select((state) => state.auth.user);

    let userId = user?.id;

    if (!userId && token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("0" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
        );
        const decoded = JSON.parse(jsonPayload);
        userId = decoded.id;
      } catch (e) {
        console.log("Erro ao decodificar token no loadDecks", e);
      }
    }
    const response = yield call(api.get, `/decks/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(loadDecksSuccess(response.data || []));
  } catch (err) {
    yield put(loadDecksSuccess([]));
  }
}

export function* createDeck({ payload }) {
  try {
    const { name, category, language } = payload;

    const token = yield select((state) => state.auth.token);
    const user = yield select((state) => state.auth.user);

    let userId = user?.id;

    if (!userId && token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("0" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
        );
        const decoded = JSON.parse(jsonPayload);
        userId = decoded.id;
      } catch (e) {
        console.log("Erro ao decodificar token no createDeck", e);
      }
    }

    const response = yield call(
      api.post,
      "/decks",
      {
        name,
        category,
        language,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    yield put(createDeckSuccess(response.data));
    Alert.alert("Sucesso", "Baralho criado com sucesso!");

    // Dispara a atualização automática da lista
    yield put({ type: "@deck/LOAD_REQUEST" });
    yield put(loadProfileRequest());
  } catch (err) {
    showApiError(error, "Erro na criação do deck");
    yield put(deckFailure());
  }
}

export function* toggleFavorite({ payload }) {
  try {
    const { deckId } = payload;

    const token = yield select((state) => state.auth.token);
    const response = yield call(
      api.patch,
      `/decks/${deckId}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    yield put(toggleFavoriteSuccess(response.data));

    // Atualiza a lista de decks
    yield put(loadDecksRequest());
    // Atualiza os dados do perfil
    yield put(loadProfileRequest());
  } catch (err) {
    console.log(err?.response?.data);
    yield put(deckFailure());
  }
}

export default all([
  takeLatest("@deck/LOAD_REQUEST", loadDecks),
  takeLatest("@deck/CREATE_REQUEST", createDeck),
  takeLatest("@deck/TOGGLE_FAVORITE_REQUEST", toggleFavorite),
]);
