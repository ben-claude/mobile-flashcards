import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextButton from './TextButton'
import Score from './Score'
import { white, red, green } from '../utils/colors'

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
      return <Score
        score={(score / questions.length * 100).toFixed(0)}
        onDeckPressed={goBack}
        onRestartQuizPressed={this.reset}
        />
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 20 }}>{`${cardIndex + 1} / ${questions.length}`}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  quizContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'stretch',
  },
  flipButton: {
    borderWidth: 0,
  },
  flipButtonText: {
    color: red,
  },
  correctButton: {
    backgroundColor: green,
    borderWidth: 0,
  },
  correctButtonText: {
    color: white,
  },
  incorrectButton: {
    backgroundColor: red,
    borderWidth: 0,
  },
  incorrectButtonText: {
    color: white,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: state[deckId],
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
)(Quiz) 

