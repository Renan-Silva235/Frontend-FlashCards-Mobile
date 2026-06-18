import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../config/api'; // Ajustado para a pasta config/api que está na imagem
import { loadStudyCardsSuccess, reviewCardSuccess, studyFailure } from './actions';

export function* loadStudyCards() {
  try {
    const response = yield call(api.get, '/cards/study');
    yield put(loadStudyCardsSuccess(response.data));
  } catch (err) {
    console.log(err);

    yield put(loadStudyCardsSuccess([]));
  }
}

export function* reviewCard({ payload }) {
  const { cardId, status } = payload;
  try {
    yield call(api.post, `/cards/${cardId}/review`, { status });
    yield put(reviewCardSuccess(cardId, status));
  } catch (err) {
    Alert.alert('Erro', 'Não foi possível salvar o seu progresso.');
    yield put(studyFailure());
  }
}

export default all([
  takeLatest('@study/LOAD_REQUEST', loadStudyCards),
  takeLatest('@study/REVIEW_REQUEST', reviewCard),
]);