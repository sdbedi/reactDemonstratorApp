import React, { Component } from 'react'
import axios from 'axios'
// import react components
import LoginView from './LoginView'
import ProfileView from './ProfileView'

import './styles.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state= { authenticated: false, profiles: [], currentProfile: [] }
    this.AuthCheck = this.AuthCheck.bind(this)
  }

  // get all user accounts on mount
  componentDidMount() {
    const { email, profile, username, imageUrl } = this.props
    axios.get('http://localhost:4040/accounts').then(res => this.setState({ profiles: res.data }))
  }

  // check is user is signed in; establish initial app state
  AuthCheck({ email, username, profile, imageUrl }) {
    this.setState({ authenticated: true,  currentProfile: [{email: email, username: username, profile: profile, imageUrl: imageUrl}]})
  }

  render() {
    return (
      <div className="app">{ this.state.authenticated ? <ProfileView currentProfile={this.state.currentProfile} profiles={this.state.profiles} AuthCheck={this.AuthCheck} /> : <LoginView AuthCheck={this.AuthCheck}/> }</div>
    )
  }
}

export default App
