export function loadStudyCardsRequest(deckId) {
    return {
        type: "@study/LOAD_REQUEST",
        payload: { deckId },
    };
}

export function loadStudyCardsSuccess(cards) {
    return {
        type: "@study/LOAD_SUCCESS",
        payload: { cards },
    };
}

export function reviewCardRequest(sessionId, cardId, status) {
    return {
        type: "@study/REVIEW_REQUEST",
        payload: {
            sessionId,
            cardId,
            status,
        },
    };
}

export function reviewCardSuccess(cardId, status) {
    return {
        type: "@study/REVIEW_SUCCESS",
        payload: { cardId, status },
    };
}

export function studyFailure() {
    return {
        type: "@study/FAILURE",
    };
}
