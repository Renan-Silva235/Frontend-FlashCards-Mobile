import { produce } from 'immer';

const INITIAL_STATE = {
  decks: [],
  loading: false,
};

export default function deck(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deck/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@deck/LOAD_SUCCESS': {
        draft.decks = action.payload.decks;
        draft.loading = false;
        break;
      }
      case '@deck/CREATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@deck/CREATE_SUCCESS': {
        draft.decks.push(action.payload.deck);
        draft.loading = false;
        break;
      }
      case '@deck/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}