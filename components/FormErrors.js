import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { capitalizeFirstLetter } from '../utils/helpers'

const FormErrors = props =>
  <View>
    {Object.keys(props.errors).map((fieldName, i) => {
      return (
        <Text key={i}>
          {props.errors[fieldName].length > 0 
            ? `${capitalizeFirstLetter(fieldName)} ${props.errors[fieldName]}`
            : ''}
        </Text>
      )        
    })}
  </View>

FormErrors.propTypes = {
  errors: PropTypes.object.isRequired,
}

export function FormIsValid(fieldsValid) {
  return Object.keys(fieldsValid).reduce((accum, item) => (accum && fieldsValid[item]), true)
}

export default FormErrors

