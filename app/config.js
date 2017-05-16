import * as firebase from 'firebase'

// GAME CONFIG
const GAME_WIDTH = 940
const GAME_HEIGHT = 700

// FIREBASE CONFIG
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCBYGYQ4ZJ-8phAe2NdfJEJxcxtZ6MEq18',
  authDomain: 'cat-meow-side.firebaseapp.com',
  databaseURL: 'https://cat-meow-side.firebaseio.com',
  storageBucket: 'cat-meow-side.appspot.com',
}
const FIREBASE_UI_CONFIG = {
  'signInFlow': 'popup',
  'signInOptions': [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  'tosUrl': 'https://www.google.com'
}

module.exports = {
  FIREBASE_UI_CONFIG,
  GAME_WIDTH,
  GAME_HEIGHT,
  FIREBASE_CONFIG
}
