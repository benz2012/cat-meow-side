import React from 'react'

import EntryForm from 'components/EntryForm'
import Choice from './Choice'
import SignUp from './SignUp'
import Login from './Login'
import validateAuth from './Validate'
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
  callSubmit() {
    const { choice } = this.state
    if (choice === 'choice-signup') {
      this.submitSignUp()
    } else if (choice === 'choice-login') {
      this.submitLogin()
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
      // console.log('both email and password are valid')
      console.log('attempting to create account in firebase')
      this.props.firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        console.log(error)
        alert(error.message)
      })
    }
  }
  submitLogin() {
    const { email, password } = this.state
    this.props.firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error)
      alert(error)
      location.reload(true) // reloads the page from the server incase anthing broke
    })
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
            callSubmit={this.callSubmit.bind(this)}
            valid={{email: emailValid, password: passwordValid}}
          />
        </SignUp>
      )
    } else if (choice === 'choice-login') {
      return (
        <Login
          cancel={this.cancel.bind(this)}
          submit={this.submitLogin.bind(this)}>
          <EntryForm
            email={email}
            password={password}
            updateValue={this.updateValue.bind(this)}
            callSubmit={this.callSubmit.bind(this)}
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
