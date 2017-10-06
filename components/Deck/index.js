import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { gray, fontSize } from '../../styles/common'
import styles from './styles'

export default function Deck(props) {
  const { deck }  = props
  return (
    <View style={styles.container}>
      <Text style={{ fontSize }}>
        {deck.title}
      </Text>
      <Text style={{ fontSize: 16, color: gray }}>
        {deck.questions.length} cards
      </Text>
    </View>
  )
}

Deck.propTypes = {
  deck: PropTypes.object.isRequired
}

