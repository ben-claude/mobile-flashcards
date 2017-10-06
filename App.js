import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Main from './components/Main'

const App = (props) => {
  return (
    <Provider store={createStore(reducer)}>
      <Main />
    </Provider>
  )
}

export default App

