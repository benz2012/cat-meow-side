import React from 'react'

export default class EntryForm extends React.Component {
  componentDidMount() {
    document.getElementById('email-input').focus()
  }
  render() {
    const { email, password } = this.props
    return (
      <div>
        <div className='form-group'>
          <label className='control-label' htmlFor='email-input'>Email</label>
          <input className='form-control'
            id='email-input'
            type='text'
            value={email}
            onChange={this.props.updateValue.bind(this)}
            placeholder='Email'
          />
        </div>
        <div className='form-group'>
          <label className='control-label' htmlFor='password-input'>Password</label>
          <input className='form-control'
            id='password-input'
            type='password'
            value={password}
            onChange={this.props.updateValue.bind(this)}
            placeholder='Password'
          />
        </div>
      </div>
    )
  }
}
