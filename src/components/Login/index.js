import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  LoginUserApi = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    }
    if (response.ok === false) {
      this.onFailure(data.error_msg)
    }
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  updateUsername = e => {
    this.setState({username: e.target.value})
  }

  updatePassword = e => {
    this.setState({password: e.target.value})
  }

  render() {
    const {username, password, errorMsg, isError} = this.state
    const token = Cookies.get('jwt_token')
    const {history} = this.props
    if (token !== undefined) {
      history.replace('/')
    }

    return (
      <div className="login-bg">
        <div className="form-content">
          <img
            className="form-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-bg" onSubmit={this.LoginUserApi}>
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              value={username}
              onChange={this.updateUsername}
              className="input-elem"
              type="text"
              id="username"
            />
            <br />
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              onChange={this.updatePassword}
              value={password}
              className="input-elem"
              type="password"
              id="password"
            />
            <br />
            <button className="btn login" type="submit">
              Login
            </button>
            {isError && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
