import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-main-bg">
        <Header />
        <div className="home-content-bg">
          <h1 className="home-main-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-sub-heading">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="btn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
