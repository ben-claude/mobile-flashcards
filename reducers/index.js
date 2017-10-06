import { combineReducers } from 'redux'
import { 
  DECKS_RECEIVE,
  DECKS_ADD,
  DECKS_REMOVE,
  DECK_ADD_CARD,
} from '../actions/types'

function decks(state = {}, action) {
  switch (action.type) {
    case DECKS_RECEIVE:
      return {
        ...state,
        ...action.decks,
      }
    case DECKS_ADD:
      return {
        ...state,
        ...action.deck,
      }
    case DECKS_REMOVE: {
      // use destructuring to remove one property: get the remaining properties with the rest operator
      const { [action.deckId]: deckToRemove, ...newState } = state
      return newState
    }
    case DECK_ADD_CARD: {
      /*
      the code below could be simplified by normalizing the state of the redux store:
      use a reducer/state for the decks but don't store the questions into this state
      create a seperate reducer/state for the questions associated to a given deckId
      */
      const deck = state[action.deckId]
      const newQuestions = [ ...deck.questions ]
      newQuestions.push(action.card)
      const newState = {
        ...state,
        [action.deckId]: {
          ...deck,
          questions: newQuestions,
        },
      }
      return newState
    }
    default:
      return state
  }
}

export default combineReducers({
  decks,
}) 

