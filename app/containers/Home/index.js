import React from 'react'
import * as firebase from 'firebase'
import Browser from 'detect-browser'

import Auth from 'containers/Auth'
import GameContainer from 'containers/Game'
import UserSettings from 'containers/UserSettings'
import Jumbotron from 'components/Jumbotron'
import { FIREBASE_CONFIG } from 'config'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      stage: null,
      firebase: null,
      uid: null
    }
  }
  componentWillMount() {
    firebase.initializeApp(FIREBASE_CONFIG)
    firebase.auth().signOut();
    this.setState(
      {firebase: firebase},
      this.observer
    )
  }
  stageView() {
    const { stage } = this.state
    let view = null
    switch (stage) {
      case 'AUTHENTICATION':
        view = <Auth firebase={this.state.firebase} />
        break
      case 'SETTINGS':
        view = <UserSettings firebase={this.state.firebase} uid={this.state.uid} />
        break;
      case 'GAMEPLAY':
        view = <GameContainer firebase={this.state.firebase} uid={this.state.uid} />
        break;
      default:
        view = null
    }
    return view
  }
  observer() {
    this.setState({stage: 'AUTHENTICATION'})
    this.state.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.setState({uid: user.uid})
        console.log(`user ${user.email} is signed in with a uid of ${this.state.uid}`)

        firebase.database().ref('cats/').once('value').then((snapshot) => {
          const catSettings = snapshot.val()[this.state.uid]
          if (!catSettings) {
            this.setState({stage: 'SETTINGS'})
            const catLiveRef = firebase.database().ref('cats/')
            catLiveRef.on('value', (snapshot) => {
              if (snapshot.val().hasOwnProperty(this.state.uid)) {
                this.setState({stage: 'GAMEPLAY'})
                catLiveRef.off()
              }
            })
          } else {
            // setting have already been set
            this.setState({stage: 'GAMEPLAY'})
          }
        })
      } else {
        this.setState({stage: 'AUTHENTICATION'})
      }
    })
  }

  render() {
    return (
      <div>
        <Jumbotron />
        {this.stageView()}
      </div>
    )
  }
}
