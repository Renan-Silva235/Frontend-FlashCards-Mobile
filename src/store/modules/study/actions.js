export function loadStudyCardsRequest() {
  return {
    type: '@study/LOAD_REQUEST',
  };
}

export function loadStudyCardsSuccess(cards) {
  return {
    type: '@study/LOAD_SUCCESS',
    payload: { cards },
  };
}

export function reviewCardRequest(cardId, status) {
  return {
    type: '@study/REVIEW_REQUEST',
    payload: { cardId, status },
  };
}

export function reviewCardSuccess(cardId, status) {
  return {
    type: '@study/REVIEW_SUCCESS',
    payload: { cardId, status },
  };
}

export function studyFailure() {
  return {
    type: '@study/FAILURE',
  };
}