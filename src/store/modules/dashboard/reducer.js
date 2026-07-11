import { produce } from "immer";

const INITIAL_STATE = {
    statistics: {
        totalCards: 0,
        easy: 0,
        medium: 0,
        hard: 0,
    },
    loading: false,
};

export default function dashboard(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case "@dashboard/LOAD_STATISTICS_REQUEST":
                draft.loading = true;
                break;

            case "@dashboard/LOAD_STATISTICS_SUCCESS":
                draft.statistics = action.payload.statistics;
                draft.loading = false;
                break;

            case "@dashboard/FAILURE":
                draft.loading = false;
                break;

            default:
        }
    });
}
