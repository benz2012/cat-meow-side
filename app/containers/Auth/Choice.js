import React from 'react'

import Center from 'components/Center'

export default class Choice extends React.Component {
  render() {
    return (
      <Center>
        <div style={{marginTop: '100px'}}>
          <button
            id='choice-login'
            className='btn btn-primary btn-block'
            onClick={this.props.makeChoice.bind(this)}>
            Login
          </button>
          <button
            id='choice-signup'
            className='btn btn-default btn-block'
            onClick={this.props.makeChoice.bind(this)}>
            Create Account
          </button>
        </div>
      </Center>
    )
  }
}
