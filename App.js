import React from 'react';
import { View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import reducer from './reducers'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import { black, white } from './utils/colors'
import { removeDecks } from './utils/api'
import { setLocalNotification } from './utils/helpers'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      backgroundColor: black,
    },
    showIcon: true, // needed for android
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerStyle: {
        backgroundColor: white,
      }
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: 'Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    // uncomment to go back to the initial AsyncStorage state:
    //removeDecks()
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

