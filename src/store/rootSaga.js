import { all } from "redux-saga/effects";

import auth from "./modules/auth/sagas";
import deck from './modules/deck/sagas';
import study from './modules/study/sagas';
import dashboard from "./modules/dashboard/sagas";

export default function* rootSaga() {
    return yield all([
        auth,
        deck,
        study,
        dashboard
    ]);
}
