import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import { decksRemove } from '../actions'
import Deck from './Deck'
import TextButton from './TextButton'
import { removeDeck }  from '../utils/api'
import { gray, black, white } from '../utils/colors'

class DeckDetail extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  state = {
    opacity: new Animated.Value(0),
  }
  componentDidMount() {
    const { opacity } = this.state
    Animated.timing(opacity, { toValue: 1, duration: 1000 })
      .start()
  }
  shouldComponentUpdate (nextProps) {
    // to not re-render after onRemoveDeck() which removes the deck from the redux store
    return nextProps.deck !== undefined
  }
  onAddCard = () => {
    this.props.navigation.navigate(
      'NewQuestion',
      { deckId: this.props.deck.title },
    )
  }
  onRemoveDeck = () => {
    const deckTitle = this.props.deck.title
    removeDeck(deckTitle)
      .then(() => {
        this.props.decksRemove(deckTitle)
        this.props.goBack()
      })
  }
  onStartQuiz = () => {
    this.props.navigation.navigate(
      'Quiz',
      { deckId: this.props.deck.title },
    )
  }
  render() {
    const { deck } = this.props
    const { opacity } = this.state
    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <View style={{flex: 1}}>
          <Deck deck={deck} />
        </View>
        <View style={{flex: 1}}>
          <TextButton onPress={this.onAddCard}>
            Add Card
          </TextButton>
          <TextButton buttonStyle={styles.quizButton} textStyle={styles.quizButtonText} onPress={this.onStartQuiz}>
            Start Quiz
          </TextButton>
          <TextButton onPress={this.onRemoveDeck}>
            Remove Deck
          </TextButton>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  quizButton: {
    backgroundColor: black,
  },
  quizButtonText:{
    color: white,
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
  mapStateToProps, {
    decksRemove,
  }
)(DeckDetail) 

