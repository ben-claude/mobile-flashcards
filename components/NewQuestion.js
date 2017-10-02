import React from 'react'
import { View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deckAddCard } from '../actions'
import TextButton  from './TextButton'
import FormErrors, { FormIsValid }  from './FormErrors'
import { black, white, gray } from '../utils/colors'
import { addCardToDeck } from '../utils/api'

const emptyState = () => {
  return {
    question: '',
    answer: '',
    fieldsValid: {
      question: false,
      answer: false,
    },
    formErrors: {
      question: '',
      answer: '',
    },
    formValid: false,
  }
}

class NewQuestion extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  state = emptyState()
  reset = () => this.setState(emptyState())
  submit = () => {
    if (this.state.formValid) {
      const { deckId, goBack } = this.props
      const { question, answer } = this.state
      const card = {
        question,
        answer,
      }
      addCardToDeck(deckId, card)
        .then(() => {
          this.props.deckAddCard(deckId, card)
          this.reset()
          goBack()
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
        <TextInput style={styles.textInput}
          onChangeText = {value => this.handleUserInput('question', value)}
          value={this.state.question}
          placeholder='Question'
        />
        <TextInput style={styles.textInput}
          onChangeText = {value => this.handleUserInput('answer', value)}
          value={this.state.answer}
          placeholder='Answer'
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
  },
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps, {
    deckAddCard,
  }
)(NewQuestion) 

