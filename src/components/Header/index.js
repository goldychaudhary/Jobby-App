import {Link, withRouter} from 'react-router-dom'
// import GenerateButton from '../GenerateButton'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutUser = () => {
    console.log('logout')
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <img
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <div className="nav-link-container">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/jobs">
          Jobs
        </Link>
      </div>
      <button className="btn" type="button" onClick={logoutUser}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
