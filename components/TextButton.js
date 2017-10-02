import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton ({ children, onPress, buttonStyle = {}, textStyle = {}, ...buttonProps }) {
  return (
    <TouchableOpacity style={[ styles.button, buttonStyle ]} onPress={onPress} {...buttonProps}>
      <Text style={[ styles.text, textStyle ]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
} 

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 1,
    borderRadius: 2,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
  },
}) 

