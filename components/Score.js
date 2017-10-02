import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import TextButton from './TextButton'
import { white } from '../utils/colors'

class Score extends React.Component {
  static propTypes = {
    score: PropTypes.string.isRequired,
    onDeckPressed: PropTypes.func.isRequired,
    onRestartQuizPressed: PropTypes.func.isRequired,
  }
  render() {
    const { onDeckPressed, onRestartQuizPressed } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Score {this.props.score} %</Text>
        </View>
        <View style={{flex: 1}}>
          <TextButton onPress={onDeckPressed}>
            Deck
          </TextButton>
          <TextButton onPress={onRestartQuizPressed}>
            Restart quiz
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
})

export default Score

