import React, { Component } from 'react'
import Login from './Login'
import Signup from './Signup'

class LoginBoard extends Component {
  constructor(props) {
    super(props)

    this.state = { showLogin: true }
    this.toggleLoginSignup = this.toggleLoginSignup.bind(this)
  }
  
  toggleLoginSignup() {
    this.setState({ showLogin: !this.state.showLogin })
  }

  render() {
    return (
      <div>
        {
          this.state.showLogin ? <Login toggleLoginForm={this.toggleLoginSignup} AuthCheck={this.props.AuthCheck}/> : <Signup toggleLoginForm={this.toggleLoginSignup} AuthCheck={this.props.AuthCheck}/>
        }
      </div>
    )
  }
}

export default LoginBoard
