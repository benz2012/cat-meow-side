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
  componentDidMount() {
    this.setState({firebase: firebase.initializeApp(FIREBASE_CONFIG)})
  }
  userLoggedIn() {
    this.setState({authenticated: true})
  }
  render() {
    const { authenticated } = this.state
    return (
      <div>
        <Jumbotron />
        {
          authenticated ?
          <GameContainer /> :
          <Auth firebase={this.state.firebase} loggedIn={this.userLoggedIn} />
        }

      </div>
    )
  }
}
