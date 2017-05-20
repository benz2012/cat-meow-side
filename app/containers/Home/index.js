import React from 'react'
import * as firebase from 'firebase'

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
      uid: null,
      highlights: null,
    }
  }
  componentWillMount() {
    firebase.initializeApp(FIREBASE_CONFIG)
    firebase.auth().signOut();
    this.setState({firebase: firebase}, this.observer)
    this.fetchHighlights()
  }
  fetchHighlights() {
    const url = 'https://api.github.com/repos/benz2012/cat-meow-side/issues?'
    const params = {
      state: 'closed',
      labels: 'show_public',
    }
    const esc = encodeURIComponent
    const query = Object.keys(params)
      .map(k => `${esc(k)}=${esc(params[k])}`)
      .join('&')
    fetch(url.concat(query)).then(res => {
      return res.json()
    }).then(json => {
      this.setState({highlights: json})
    })
  }
  stageView() {
    const { stage, firebase, uid, highlights } = this.state
    let view = null
    switch (stage) {
      case 'AUTHENTICATION':
        view = <Auth firebase={firebase} highlights={highlights} />
        break
      case 'SETTINGS':
        view = <UserSettings firebase={firebase} uid={uid} />
        break;
      case 'GAMEPLAY':
        view = <GameContainer firebase={firebase} uid={uid} />
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
        firebase.database().ref('active').once('value').then((snapshot) => {
          // only allow a user to have one active sign in
          if (snapshot.val() && snapshot.val().hasOwnProperty(user.uid)) {
            alert('This account is signed in somewhere else')
            this.setState({stage: 'AUTHENTICATION'})
          } else {
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
