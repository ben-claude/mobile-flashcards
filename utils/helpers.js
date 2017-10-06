import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const STORAGE_KEY_NOTIFICATION = 'flashcards:notifications'

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(STORAGE_KEY_NOTIFICATION)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Study your quizzes!',
    body: "👋 don't forget study your quizzes today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(STORAGE_KEY_NOTIFICATION)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              //
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)
              //
              Notifications.scheduleLocalNotificationsAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              //
              AsyncStorage.setItem(STORAGE_KEY_NOTIFICATION, JSON.stringify(true))
            }
          })
      }
    })
} 

