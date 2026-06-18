import * as types from "./types";

const INITIAL_STATE = {
  token: null,
  user: null,
  loading: false,
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        signed: true,
        loading: false,
      };
    case types.SIGN_IN_FAILURE:
      return { ...state, loading: false };
    case types.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
