import { takeLatest, call, put, all } from "redux-saga/effects";
import { Alert } from "react-native";
import api from "../../../config/api"; // Ajustado para a pasta config/api que está na imagem
import {
    loadStudyCardsSuccess,
    reviewCardSuccess,
    studyFailure,
} from "./actions";

export function* loadStudyCards({ payload }) {
    try {
        const { deckId } = payload;

        const response = yield call(api.get, `/flashcards/deck/${deckId}`);

        yield put(loadStudyCardsSuccess(response.data));
    } catch (err) {
        console.log(err);

        yield put(loadStudyCardsSuccess([]));
    }
}

export function* reviewCard({ payload }) {
    const { sessionId, cardId, status } = payload;
    console.log("Review:", { sessionId, cardId, status });
    try {
        yield call(
            api.post,
            `/study-sessions/${sessionId}/review`,
            {
                flashcardId: cardId,
                result: status,
            }
        );

        yield put(reviewCardSuccess(cardId, status));
    } catch (err) {
        console.log("ERRO:", err);
        console.log("RESPONSE:", err?.response);
        console.log("DATA:", err?.response?.data);
        Alert.alert("Erro", "Não foi possível salvar o seu progresso.");
        yield put(studyFailure());
    }
}

export default all([
    takeLatest("@study/LOAD_REQUEST", loadStudyCards),
    takeLatest("@study/REVIEW_REQUEST", reviewCard),
]);
