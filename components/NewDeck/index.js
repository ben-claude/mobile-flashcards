import React from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextButton from '../TextButton'
import FormErrors, { FormIsValid }  from '../FormErrors'
import { decksAdd } from '../../actions'
import { saveDeckTitle }  from '../../utils/api'
import styles from './styles'

const emptyState = () => {
  return {
    deckTitle: '',
    //
    fieldsValid: {
      deckTitle: false,
    },
    formErrors: {
      deckTitle: '',
    },
    formValid: false,
  }
}

class NewDeck extends React.Component {
  static propTypes = {
  }
  state = emptyState()
  reset = () => this.setState(emptyState())
  submit = () => {
    const deckTitle = this.state.deckTitle
    if (this.state.formValid) {
      saveDeckTitle(deckTitle)
        .then(() => {
          this.props.decksAdd(deckTitle)
          this.reset()
          Keyboard.dismiss()
          this.props.navigation.navigate(
            'DeckDetail',
            { deckId: deckTitle },
          )
        })
    }
  }
  handleUserInput = (name, value) => {
    this.setState({ [name]: value }, () => { this.validateField(name, value) })
  }
  validateField = (name, value) => {
    this.setState(({ fieldsValid, formErrors }) => {
      const valid = value.length > 0
      const msg = valid ? '' : 'is mandatory'
      return {
        fieldsValid: { ...fieldsValid, [name]: valid, },
        formErrors: { ...formErrors, [name]: msg, },
      }
    }, this.validateForm)
  }
  validateForm = () => {
    this.setState({
      formValid: FormIsValid(this.state.fieldsValid)
    })
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <FormErrors errors={this.state.formErrors} />
        <Text style={styles.text}>What it the title of your new deck ?</Text>
        <TextInput style={styles.textInput}
          onChangeText = {value => this.handleUserInput('deckTitle', value)}
          value={this.state.deckTitle}
          placeholder='Deck Title'
        />
        <TextButton
          buttonStyle={styles.submitButton}
          textStyle={styles.submitButtonText}
          onPress={this.submit}
          disabled={!this.state.formValid}
        >
          Submit
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(
  null, { 
    decksAdd,
  }
)(NewDeck)

