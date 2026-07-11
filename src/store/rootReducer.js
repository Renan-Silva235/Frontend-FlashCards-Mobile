import { combineReducers } from "redux";

import auth from "./modules/auth/reducer";
import deck from './modules/deck/reducer';
import study from './modules/study/reducer';
import dashboard from "./modules/dashboard/reducer";

console.log("dashboard reducer =", dashboard);
export default combineReducers({
    auth,
    deck,
    study,
    dashboard
});
