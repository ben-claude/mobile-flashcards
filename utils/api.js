import { AsyncStorage } from 'react-native'

// use an AsyncStorage key identifying both our app (flashcards) and the value content (decks)
const STORAGE_KEY_DECKS = 'flashcards:decks'
const STORAGE_KEY_INTRO = 'flashcards:intro'

function generateDummyData() {
  const data = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ],
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ],
    },
    Java: {
      title: 'Java',
      questions: [],
    },
    Python: {
      title: 'Python',
      questions: [],
    },
  }
  //
  AsyncStorage.setItem(STORAGE_KEY_DECKS, JSON.stringify(data))
  return data
}

// it return all of the decks along with their titles, questions, and answers. 
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY_DECKS)
    .then(results => {
      const data = results === null 
        ? generateDummyData() 
        : JSON.parse(results)
      return data
    })
}

// take in a single id argument and return the deck associated with that id. 
export function getDeck(deckId) {
  return getDecks().then(decks => {
    // return the property of the 'decks' object with key equals to the values contained in the string deckId:
    return decks[deckId]
  })
}

// take in a single title argument and add it to the decks. 
export function saveDeckTitle(deckId) {
  return AsyncStorage.mergeItem(STORAGE_KEY_DECKS, JSON.stringify({
    [deckId]: {
      title: deckId,
      questions: [],
    }
  }))
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(deckId, card) {
  return getDecks().then(decks => {
    if (!(deckId in decks)) {
      console.log(`addCardToDeck: deck ${deckId} not found`)
      return
    }
    const deck = decks[deckId]
    deck.questions.push(card)
    AsyncStorage.setItem(STORAGE_KEY_DECKS, JSON.stringify(decks))
  })
}

// remove all the decks
export function removeDecks() {
  return AsyncStorage.removeItem(STORAGE_KEY_DECKS)
}

export function removeDeck(deckId) {
  return AsyncStorage.getItem(STORAGE_KEY_DECKS)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckId] = undefined
      delete data[deckId]
      AsyncStorage.setItem(STORAGE_KEY_DECKS, JSON.stringify(data))
    })
}

function generateEmptyIntro() {
  const data = {
    remainingCount: 3, // stop showing the "app intro" after three 'skip' from user
  }
  AsyncStorage.setItem(STORAGE_KEY_INTRO, JSON.stringify(data))
  return data
}

export function getIntro() {
  return AsyncStorage.getItem(STORAGE_KEY_INTRO)
    .then(results => {
      const data = results === null 
        ? generateEmptyIntro() 
        : JSON.parse(results)
      return data
    })
}

export function setIntroRemainingCount(remainingCount) {
  return getIntro().then(intro => {
    AsyncStorage.setItem(STORAGE_KEY_INTRO, JSON.stringify({
      ...intro,
      remainingCount,
    }))
  })
}

export function removeIntro() {
  return AsyncStorage.removeItem(STORAGE_KEY_INTRO)
}

