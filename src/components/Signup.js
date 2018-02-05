import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = { email: '', username: '', password: '', profile: '', url: '', data: null }
    this.EmailChange = this.EmailChange.bind(this)
    this.PasswordChange = this.PasswordChange.bind(this)
    this.UsernameChange = this.UsernameChange.bind(this)
    this.ProfileChange = this.ProfileChange.bind(this)
    this.UrlChange = this.UrlChange.bind(this)
    this.SignupSubmit = this.SignupSubmit.bind(this)
  }

  EmailChange(e) {
    this.setState({ email: e.target.value })
  }

  PasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  UsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  ProfileChange(e) {
    this.setState({ profile: e.target.value })
  }

  UrlChange(e) {
    this.setState({ url: e.target.value })
  }

  // submits user data in input to db
  SignupSubmit(e) {
    e.preventDefault()
    const user = { email: this.state.email, username: this.state.username, password: this.state.password, profile: this.state.profile, imageUrl: this.state.url }
    axios.post('http://localhost:4040/signup', user).then(this.props.AuthCheck(user))
  }

  render() {
    return (
      <div>
        <p>Sign up for an account, or use the Login button below if you already have one.</p>
        <form className="signin-form" onSubmit={ this.SignupSubmit }>
          <input type='text' placeholder='Email' value={ this.state.email } onChange={ this.EmailChange } />
          <input type='text' placeholder='Username' value={ this.state.username } onChange={ this.UsernameChange } />
          <input type='password' placeholder='Password' value={ this.state.password } onChange={ this.PasswordChange } />
          <input type='text' placeholder='Profile' value={ this.state.Profile } onChange={ this.ProfileChange } />
          <input type='text' placeholder='Image Url' value={ this.state.url } onChange={ this.UrlChange } />
          <input type='submit' value='Create Account' onSubmit={ this.SignupSubmit }/>
        </form>
        <button onClick={ this.props.toggleLoginForm }>Already have an account? Click here to Log In</button>
      </div>
    )
  }
}

export default Signup
