import { StyleSheet } from 'react-native'
import { black, white, gray } from '../../styles/common'

export default StyleSheet.create({
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


