import {Link, withRouter} from 'react-router-dom'
import {FaBriefcase} from 'react-icons/fa'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <ul className="navbar lg">
        <Link to="/">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <div className="nav-link-container">
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/jobs">
              Jobs
            </Link>
          </li>
        </div>

        <li>
          <button className="btn" type="button" onClick={logoutUser}>
            Logout
          </button>
        </li>
      </ul>
      <ul className="navbar sm">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div className="nav-link-container">
          <li>
            <Link className="nav-link" to="/">
              <AiFillHome />
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/jobs">
              <FaBriefcase />
            </Link>
          </li>
        </div>
        <li>
          <button className="logout-sm" type="button" onClick={logoutUser}>
            <FiLogOut />
          </button>
        </li>
      </ul>
    </>
  )
}

export default withRouter(Header)
