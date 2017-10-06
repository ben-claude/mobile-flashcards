import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import TextButton from '../TextButton'
import styles from './styles'

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

export default Score

