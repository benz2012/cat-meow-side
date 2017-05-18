import React from 'react'

export default class EntryForm extends React.Component {
  componentDidMount() {
    document.getElementById('email-input').focus()
  }
  valid(test) {
    if (!test) {
      return 'form-group has-error'
    } else {
      return 'form-group'
    }
  }
  warn(label) {
    return <p><strong className='text-danger'>invalid {label}</strong></p>
  }
  checkKey(e) {
    if (e.keyCode == 13) {
      this.props.callSubmit()
    }
  }
  render() {
    const { email, password, valid={email: true, password: true} } = this.props
    return (
      <div>
        <div className={this.valid(valid.email)}>
          <label className='control-label' htmlFor='email-input'>Email</label>
          {!valid.email && this.warn('email')}
          <input className='form-control'
            id='email-input'
            type='text'
            value={email}
            onChange={this.props.updateValue.bind(this)}
            onKeyUp={this.checkKey.bind(this)}
            placeholder='example@email.com'
          />
        </div>
        <div className={this.valid(valid.password)}>
          <label className='control-label' htmlFor='password-input'>Password</label>
          {!valid.password && this.warn('password')}
          <input className='form-control'
            id='password-input'
            type='password'
            value={password}
            onChange={this.props.updateValue.bind(this)}
            onKeyUp={this.checkKey.bind(this)}
            placeholder='Password'
          />
        </div>
      </div>
    )
  }
}
