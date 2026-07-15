import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "../../../config/api";
import { loadStatisticsSuccess, dashboardFailure } from "./actions";

export function* loadStatistics({ payload }) {
  try {
    const { language } = payload;

    const response = yield call(
      api.get,
      `/statistics${language ? `?language=${language}` : ""}`,
    );

    yield put(loadStatisticsSuccess(response.data));
  } catch (err) {
    console.log(err?.response?.data);
    yield put(dashboardFailure());
  }
}

export default all([
  takeLatest("@dashboard/LOAD_STATISTICS_REQUEST", loadStatistics),
]);
