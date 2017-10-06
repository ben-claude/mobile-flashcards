import { StyleSheet } from 'react-native'
import { white, red, green } from '../../styles/common'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  quizContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'stretch',
  },
  flipButton: {
    borderWidth: 0,
  },
  flipButtonText: {
    color: red,
  },
  correctButton: {
    backgroundColor: green,
    borderWidth: 0,
  },
  correctButtonText: {
    color: white,
  },
  incorrectButton: {
    backgroundColor: red,
    borderWidth: 0,
  },
  incorrectButtonText: {
    color: white,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
})

