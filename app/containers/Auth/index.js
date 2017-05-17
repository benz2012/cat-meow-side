import React from 'react'
import * as firebaseui from 'firebaseui'

import EntryForm from 'components/EntryForm'
import Choice from './Choice'
import SignUp from './SignUp'
import Login from './Login'
import validateAuth from './Validate'
// console.log(validateAuth)
import { FIREBASE_UI_CONFIG } from 'config'

export default class Auth extends React.Component {
  constructor() {
    super()
    this.state = {
      choice: null,
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true,
    }
  }
  componentWillReceiveProps(nextProps) {
    const firebasePrev = this.props.firebase
    const { firebase } = nextProps
    if (!firebasePrev && firebase) {
      // Initialize the FirebaseUI Widget using Firebase.
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      let currentUid = null
    }
  }
  makeChoice(e) {
    this.setState({choice: e.target.id})
  }
  cancel() {
    this.setState({choice: null, email: '', password: ''})
  }
  updateValue(e) {
    if (e.target.id === 'email-input') {
      this.setState({email: e.target.value})
    }
    if (e.target.id === 'password-input') {
      this.setState({password: e.target.value})
    }
  }
  submitSignUp() {
    const { email, password } = this.state
    const validations = validateAuth(email, password)
    this.setState({
      emailValid: validations.email,
      passwordValid: validations.password
    })
    if (validations.email && validations.password) {
      return
    }
  }
  chooseEntryPoint() {
    const { choice, email, password, emailValid, passwordValid } = this.state
    if (choice === 'choice-signup') {
      return (
        <SignUp
          cancel={this.cancel.bind(this)}
          submit={this.submitSignUp.bind(this)}>
          <EntryForm
            email={email}
            password={password}
            updateValue={this.updateValue.bind(this)}
            valid={{email: emailValid, password: passwordValid}}
          />
        </SignUp>
      )
    } else if (choice === 'choice-login') {
      return (
        <Login cancel={this.cancel.bind(this)}>
          <EntryForm
            email={email}
            password={password}
            updateValue={this.updateValue.bind(this)}
          />
        </Login>
      )
    } else {
      return (
        <Choice makeChoice={this.makeChoice.bind(this)} />
      )
    }
  }
  render() {
    return (
      <div>
        {this.chooseEntryPoint()}
      </div>
    )
  }
}
