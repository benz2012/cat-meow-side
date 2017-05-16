import React from 'react'

import GameContainer from 'containers/Game'
import Auth from 'components/Auth'
import Jumbotron from 'components/Jumbotron'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticated: true
    }
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
          <Auth loggedIn={this.userLoggedIn} />
        }

      </div>
    )
  }
}
