import {Component} from 'react'

import Header from '../Header'
import './index.css'

class Home extends Component {
  findJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

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
          <button className="btn" type="button" onClick={this.findJobs}>
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
