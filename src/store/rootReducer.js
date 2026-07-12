import { combineReducers } from "redux";

import auth from "./modules/auth/reducer";
import deck from './modules/deck/reducer';
import study from './modules/study/reducer';
import dashboard from "./modules/dashboard/reducer";

export default combineReducers({
    auth,
    deck,
    study,
    dashboard
});
