import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmployeeType from '../EmployeeType'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

console.log(employmentTypesList, salaryRangesList)

class Jobs extends Component {
  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const url = 'https://apis.ccbp.in/jobs'

    const options = {
      method: 'GET',
      headers: {
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${jwtToken}`,
        },
      },
    }

    const response = await fetch(url, options)
    console.log(response.headers)
    const data = await response.json()
    console.log(data)
  }

  renderProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        Authentication: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)

    const data = await response.json()
    console.log(data)
    // if (response.ok === true) {
    //   this.onProfileApiSuccess(data)
    // }
    // if (response.ok === false) {
    //   this.onProfileApiFailure()
    // }
  }

  onProfileApiSuccess = data => {
    console.log(data)
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/male-avatar-img.png"
          alt=""
        />
        <p className="name">Pavan</p>
        <p className="role">Developer</p>
      </>
    )
  }

  onProfileApiFailure = () => <button type="button">Retry</button>

  renderSalaryList = each => (
    <li key={each.salaryRangeId}>
      <input id={each.salaryRangeId} type="radio" />
      <label className="type-label" htmlFor={each.salaryRangeId}>
        {each.label}
      </label>
    </li>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-main-bg">
          <div className="filters-main-bg">
            <div className="profile-container">
              {/* {this.renderProfile()} */}
              <p>Profile</p>
            </div>
            <hr className="line" />
            <ul className="type-list-ul">
              <h1 className="type-heading">Type of Employment</h1>
              {employmentTypesList.map(each => (
                <EmployeeType details={each} key={each.employmentTypeId} />
              ))}
            </ul>
            <hr className="line" />
            {/* <ul className="type-list-ul">
              <h1 className="type-heading">Salary Range</h1>
              {salaryRangesList.map(each => this.renderSalaryList(each))}
            </ul> */}
          </div>
          <div className="jobs-list-bg">
            <p>JObs</p>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
