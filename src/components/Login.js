import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
    console.log("props: ", props);
    this.state = { email: '', password: '' }
    this.EmailChange = this.EmailChange.bind(this)
    this.PasswordChange = this.PasswordChange.bind(this)
    this.LoginSubmit = this.LoginSubmit.bind(this)
  }

  EmailChange(e) {
    this.setState({ email: e.target.value })
    console.log("e target val: ", e.target.value)
  }

  PasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  // submits login data to db, db currently only checks email - need to implement password checking
  LoginSubmit(e) {
    e.preventDefault();
    console.log("email in loginsubmit: ", this.state.email)
    const user = { email: this.state.email, password: this.state.password }
    axios.post('/login', user).then(user => this.props.AuthCheck(user.data))
  }

  render() {
    return (
      <div>
        <p>Please enter your info below to login, or click Sign Up to create an account.</p>
        <form className="signin-form" onSubmit={ this.LoginSubmit }>
          <input type='text' placeholder='Email' value={ this.state.email } onChange={ this.EmailChange } />
          <input type='password' placeholder='Password' value={ this.state.password } onChange={ this.PasswordChange } />
          <input type='submit' value='Login' />
        </form>
        <button onClick={ this.props.toggleLoginForm }>Don't have an account? Click here to Sign Up.</button>
      </div>
    )
  }
}

export default Login
