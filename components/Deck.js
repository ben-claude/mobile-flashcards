import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { gray } from '../utils/colors'

export default function Deck(props) {
  const { deck }  = props
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
}) 

