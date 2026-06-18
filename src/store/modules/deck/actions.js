export function loadDecksRequest() {
  return {
    type: '@deck/LOAD_REQUEST',
  };
}

export function loadDecksSuccess(decks) {
  return {
    type: '@deck/LOAD_SUCCESS',
    payload: { decks },
  };
}

export function createDeckRequest(name, category, language) {
  return {
    type: '@deck/CREATE_REQUEST',
    payload: { name, category, language },
  };
}

export function createDeckSuccess(deck) {
  return {
    type: '@deck/CREATE_SUCCESS',
    payload: { deck },
  };
}

export function deckFailure() {
  return {
    type: '@deck/FAILURE',
  };
}