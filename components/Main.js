import React from 'react';
import { View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { connect  } from 'react-redux'
import { Constants } from 'expo'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import DeckList from './DeckList'
import NewDeck from './NewDeck'
import DeckDetail from './DeckDetail'
import NewQuestion from './NewQuestion'
import Quiz from './Quiz'
import Intro from './Intro'
import { black, white } from '../styles/common'
import { removeDecks, getIntro, setIntroRemainingCount, removeIntro } from '../utils/api'
import { setLocalNotification } from '../utils/helpers'

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

class Main extends React.Component {
  state = {
    introRemainingCount: 0,
  }
  componentDidMount() {
    getIntro().then(intro => {
      this.setState({ introRemainingCount: intro.remainingCount })
    })
    setLocalNotification()
  }
  onIntroDone = () => {
    this.setState({ introRemainingCount: 0 })
  }
  onIntroSkipped = () => {
    const count = this.state.introRemainingCount - 1
    this.onIntroDone()
    setIntroRemainingCount(count)
  }
  render() {
    // uncomment to go back to the initial AsyncStorage state:
    //removeDecks()
    //removeIntro()
    //
    const { introRemainingCount } = this.state
    if (introRemainingCount > 0)
      return <Intro onDone={this.onIntroDone} onSkipped={this.onIntroSkipped} />
    //
    return (
      <View style={{flex: 1}}>
        <View style={{ height: Constants.statusBarHeight }}>
          <StatusBar />
        </View>
        <MainNavigator />
      </View>
    );
  }
}

export default Main

