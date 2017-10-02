import React from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextButton from './TextButton'
import FormErrors, { FormIsValid }  from './FormErrors'
import { decksAdd } from '../actions'
import { saveDeckTitle }  from '../utils/api'
import { black, white, gray } from '../utils/colors'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    padding: 20,
  },
  text: {
    fontSize: 20,
    margin: 5,
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: gray, 
  },
  submitButton: {
    backgroundColor: black,
  },
  submitButtonText:{
    color: white,
  }
})

function mapStateToProps(decks, props) {
  return {}
}

export default connect(
  mapStateToProps, { 
    decksAdd,
  }
)(NewDeck)

