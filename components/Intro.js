import React from 'react'
import AppIntro from 'react-native-app-intro'

class Intro extends React.Component {
  render() {
    const pageArray = [{
      title: 'Deck List',
      description: 'Manage many decks of cards',
      img: require('../assets/deck_list.png'),
      imgStyle: {
        height: 152,
        width: 377,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Quiz',
      description: 'Train yourself with quizzes',
      img: require('../assets/quiz.png'),
      imgStyle: {
        height: 190,
        width: 371,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'New Deck',
      description: 'Easily create new decks',
      img: require('../assets/new_deck.png'),
      imgStyle: {
        height: 188,
        width: 379,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'New Card',
      description: 'Easily add new cards to a deck',
      img: require('../assets/new_question.png'),
      imgStyle: {
        height: 210,
        width: 377,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }]
    return (
      <AppIntro
        onDoneBtnClick={this.props.onDone}
        onSkipBtnClick={this.props.onSkipped}
        pageArray={pageArray}
        showDots={false}
      />
    )
  }
}

export default Intro

