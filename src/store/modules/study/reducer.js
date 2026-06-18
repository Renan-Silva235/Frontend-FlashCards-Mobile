import { produce } from 'immer';

const INITIAL_STATE = {
  cards: [],
  loading: false,
};

export default function study(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@study/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@study/LOAD_SUCCESS': {
        draft.cards = action.payload.cards;
        draft.loading = false;
        break;
      }
      case '@study/REVIEW_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@study/REVIEW_SUCCESS': {
        draft.cards = draft.cards.filter(card => card.id !== action.payload.cardId);
        draft.loading = false;
        break;
      }
      case '@study/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}