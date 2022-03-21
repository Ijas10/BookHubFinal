import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  getLoggedIn = async () => {
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, showErrorMsg: true})
    }
  }

  loginUser = event => {
    event.preventDefault()
    this.getLoggedIn()
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="LoginMainPage">
        <div className="imgContLogin">
          <img
            src="https://res.cloudinary.com/dnlxvy81c/image/upload/v1646651304/Ellipse_99_zgpoqv.jpg"
            className="img1"
            alt="website login"
          />
          <img
            src="https://res.cloudinary.com/dnlxvy81c/image/upload/v1646649975/Rectangle_1467_oecrkd.jpg"
            className="img2"
            alt="website login"
          />
        </div>
        <div className="formContainer">
          <form className="form" onSubmit={this.loginUser}>
            <img
              src="https://res.cloudinary.com/dnlxvy81c/image/upload/v1646652501/Group_7731_xycocp.svg"
              className="websiteLogo"
              alt="login website logo"
            />

            <label className="label" htmlFor="input1">
              Username*
            </label>
            <input
              className="input"
              id="input1"
              type="text"
              onChange={this.changeUsername}
            />
            <label className="label" htmlFor="input2">
              Password*
            </label>
            <input
              className="input"
              id="input2"
              type="password"
              onChange={this.changePassword}
            />
            {showErrorMsg && <p className="errorMsg">{errorMsg}</p>}
            <button className="btnSubmit" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
