import React from 'react'

import Center from 'components/Center'

export default class Login extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Center>
        <div>
          <h1>Log In</h1>
          {children}
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.props.submit.bind(this)}>
              Login
            </button>
            <button
              type="reset"
              className="btn btn-default"
              onClick={this.props.cancel.bind(this)}>
              Cancel
            </button>
          </div>
        </div>
      </Center>
    )
  }
}
