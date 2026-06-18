import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../config/api';
import { loadDecksSuccess, createDeckSuccess, deckFailure } from './actions';

export function* loadDecks() {
  try {
    const token = yield select((state) => state.auth.token);
    const user = yield select((state) => state.auth.user);

    let userId = user?.id;

    if (!userId && token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decoded = JSON.parse(jsonPayload);
        userId = decoded.id;
      } catch (e) {
        console.log("Erro ao decodificar token no loadDecks", e);
      }
    }
    console.log("TOKEN REDUX:", token);
    console.log("USER REDUX:", user);
    console.log("USER ID:", userId);
    const response = yield call(api.get, `/decks/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("DECKS RECEBIDOS DA API:");
    console.log(JSON.stringify(response.data, null, 2));
    yield put(loadDecksSuccess(response.data || []));
  } catch (err) {
      console.log("========== ERRO LOAD DECKS ==========");
      console.log("STATUS:", err?.response?.status);
      console.log("DATA:", JSON.stringify(err?.response?.data, null, 2));
      console.log("HEADERS:", err?.response?.headers);

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
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decoded = JSON.parse(jsonPayload);
        userId = decoded.id;
      } catch (e) {
        console.log("Erro ao decodificar token no createDeck", e);
      }
    }

    const response = yield call(api.post, '/decks', {
      name,
      category,
      language,
      userId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    yield put(createDeckSuccess(response.data));
    Alert.alert('Sucesso', 'Baralho criado com sucesso!');

    // Dispara a atualização automática da lista
    yield put({ type: '@deck/LOAD_REQUEST' });
  } catch (err) {
    if (err.response) {
      console.log("STATUS DO ERRO NO JAVA:", err.response.status);
      console.log("O QUE O JAVA RESPONDEU:", JSON.stringify(err.response.data, null, 2));
    }
    Alert.alert('Erro na criação', 'Verifique os dados do baralho.');
    yield put(deckFailure());
  }
}

export default all([
  takeLatest('@deck/LOAD_REQUEST', loadDecks),
  takeLatest('@deck/CREATE_REQUEST', createDeck),
]);