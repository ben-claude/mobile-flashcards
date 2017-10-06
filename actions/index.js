import { 
  DECKS_RECEIVE,
  DECKS_ADD,
  DECKS_REMOVE,
  DECK_ADD_CARD,
} from './types'

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

