import React from 'react'

import Center from 'components/Center'

export default class SignUp extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Center>
        <div>
          <h1>Create an Account</h1>
          {children}
          <div style={{marginBottom: '30px', marginTop: '-10px'}}>
            <ul>
              <li><small>At least 8 characters</small></li>
              <li><small>At least one digit</small></li>
              <li><small>At least one letter</small></li>
            </ul>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.props.submit.bind(this)}>
              Sign Up
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
