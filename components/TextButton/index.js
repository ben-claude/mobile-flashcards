import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

export default function TextButton ({ children, onPress, buttonStyle = {}, textStyle = {}, ...buttonProps }) {
  return (
    <TouchableOpacity style={[ styles.button, buttonStyle ]} onPress={onPress} {...buttonProps}>
      <Text style={[ styles.text, textStyle ]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
} 

