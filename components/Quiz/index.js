import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextButton from '../TextButton'
import Score from '../Score'
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers'
import { fontSize } from '../../styles/common'
import styles from './styles'

function emptyState() {
  return {
    cardIndex: 0,
    flip: false,
    score: 0,
  }
}

class Quiz extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  state = emptyState()
  onFlip = () => {
    this.setState({ flip: !this.state.flip })
  }
  onAnswer = (correct) => {
    const stateModif = {
      cardIndex: this.state.cardIndex + 1,
      flip: false,
    }
    if (correct) {
      stateModif.score = this.state.score + 1
    }
    this.setState(stateModif)
  }
  onCorrectAnswer = () => this.onAnswer(true)
  onIncorrectAnswer = () => this.onAnswer(false)
  reset = () => {
    this.setState(emptyState())
  }
  render() {
    const { deck, goBack } = this.props
    const { questions } = deck
    const { cardIndex, flip, score } = this.state
    const card = questions[cardIndex]
    if (!questions || questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Empty deck</Text>
        </View>
      )
    }
    if (cardIndex === questions.length) {
      // reset notification for today and schedule again for tomorrow
      clearLocalNotification()
        .then(setLocalNotification)
      return <Score
        score={(score / questions.length * 100).toFixed(0)}
        onDeckPressed={goBack}
        onRestartQuizPressed={this.reset}
        />
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize }}>{`${cardIndex + 1} / ${questions.length}`}</Text>
        </View>
        <View style={styles.quizContainer}>
          <Text style={styles.text}>{flip ? card.answer : card.question}</Text>
          <TextButton buttonStyle={styles.flipButton} textStyle={styles.flipButtonText} onPress={this.onFlip}>
            {flip ? 'Question' : 'Answer'}
          </TextButton>
        </View>
        <View style={styles.buttonContainer}>
          <TextButton buttonStyle={styles.correctButton} textStyle={styles.correctButtonText} onPress={this.onCorrectAnswer}>
            Correct
          </TextButton>
          <TextButton buttonStyle={styles.incorrectButton} textStyle={styles.incorrectButtonText} onPress={this.onIncorrectAnswer}>
            Incorrect
          </TextButton>
        </View>
      </View>
    )
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId],
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
)(Quiz) 

