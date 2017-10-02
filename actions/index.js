export const DECKS_RECEIVE = 'DECKS_RECEIVE'
export const DECKS_ADD = 'DECK_ADD'
export const DECKS_REMOVE = 'DECKS_REMOVE'
export const DECK_ADD_CARD = 'DECK_ADD_CARD'

export function decksReceive(decks) {
  return {
    type: DECKS_RECEIVE,
    decks,
  }
}

export function decksAdd(deckId) {
  return {
    type: DECKS_ADD,
    deck: {
      [deckId]: {
        title: deckId,
        questions: [],
      }
    },
  }
} 

export function decksRemove(deckId) {
  return {
    type: DECKS_REMOVE,
    deckId,
  }
} 

export function deckAddCard(deckId, card) {
  return {
    type: DECK_ADD_CARD,
    deckId,
    card,
  }
} 

