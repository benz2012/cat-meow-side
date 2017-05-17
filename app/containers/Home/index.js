import React from 'react'
import * as firebase from 'firebase'

import Auth from 'containers/Auth'
import GameContainer from 'containers/Game'
import Jumbotron from 'components/Jumbotron'
import { FIREBASE_CONFIG } from 'config'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      firebase: null
    }
  }
  componentWillMount() {
    firebase.initializeApp(FIREBASE_CONFIG)
    firebase.auth().signOut();
    this.setState(
      {firebase: firebase},
      this.firebaseAuthObserver
    )
  }
  firebaseAuthObserver() {
    this.state.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        console.log(`user ${user.email} is signed in with a uid of ${user.uid}`)
        this.setState({authenticated: true})
      } else {
        this.setState({authenticated: false})
      }
    })
  }
  render() {
    const { authenticated } = this.state
    return (
      <div>
        <Jumbotron />
        {
          authenticated ?
          <GameContainer /> :
          <Auth firebase={this.state.firebase} />
        }

      </div>
    )
  }
}
