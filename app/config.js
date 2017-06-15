import * as firebase from 'firebase'

/*
* GAME CONFIG
*/
const GAME = {}
GAME.WIDTH = 940
GAME.HEIGHT = 700

GAME.CAT = {}
GAME.CAT.TYPE = Object.freeze({
  WORRIER: 0,
  WARRIOR: 1,
})
GAME.CAT.HP = Object.freeze({
  WORRIER: 10,
  WARRIOR: 15,
})
GAME.CAT.WEAPON_DISTANCE = Object.freeze({
  WORRIER: 300,
  WARRIOR: 20
})
GAME.CAT.COLOR = Object.freeze({
  WHITE_STRIPPED: 0,
  WHITE: 1,
  YELLOW_STRIPPED: 2,
  YELLOW: 3,
  ORANGE_STRIPPED: 4,
  ORANGE: 5,
  BLACK: 6,
})
GAME.CAT.SPEED = Object.freeze({
  STRAIGHT: 300,
  DIAGONAL: 212, // should always be STRAIGHT / rad(2)
})

GAME.CAT.DIRECTION = Object.freeze({
  EAST: 0,
  NORTH: 1,
  WEST: 2,
  SOUTH: 3
})

// GAME.RENDER = Object.freeze({
//   CHROME: 'WEBGL',
//   FIREFOX: 'CANVAS',
//   SAFARI: 'CANVAS',
// })

/*
* FIREBASE CONFIG
*/
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCBYGYQ4ZJ-8phAe2NdfJEJxcxtZ6MEq18',
  authDomain: 'cat-meow-side.firebaseapp.com',
  databaseURL: 'https://cat-meow-side.firebaseio.com',
  storageBucket: 'cat-meow-side.appspot.com',
}

module.exports = {
  GAME,
  FIREBASE_CONFIG
}
