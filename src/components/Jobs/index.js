import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobsList from '../JobsList'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    jobListApiStatus: apiStatusConstants.initial,
    profileDetailsList: [],
    jobsList: [],
    salaryPackage: '',
    employementType: [],
    userSearch: '',
  }

  componentDidMount() {
    this.getJobsList()
    this.renderProfile()
  }

  getJobsList = async () => {
    this.setState({jobListApiStatus: apiStatusConstants.inProgress})
    const {salaryPackage, employementType, userSearch} = this.state
    const empType = employementType.join()
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salaryPackage}&search=${userSearch}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (data.jobs.length === 0) {
      this.setState({jobListApiStatus: apiStatusConstants.noJobs})
    } else if (response.ok) {
      const updatedJobsList = data.jobs.map(each => ({
        companyLogo: each.company_logo_url,
        companyUrl: each.company_logo_url,
        employementType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedJobsList,
        jobListApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobListApiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedProfileData = {
        profileName: data.profile_details.name,
        profileImage: data.profile_details.profile_image_url,
        profileBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetailsList: updatedProfileData,
        profileApiStatus: apiStatusConstants.success,
      })
    }
    if (response.ok === false) {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  onProfileApiSuccess = () => {
    const {profileDetailsList} = this.state

    const {profileImage, profileName, profileBio} = profileDetailsList
    return (
      <div className="profile-container">
        <img src={profileImage} alt="profile" />
        <h1 className="name">{profileName}</h1>
        <p className="role">{profileBio}</p>
      </div>
    )
  }

  onProfileApiFailure = () => (
    <div className="profile-container failed-profile-bg">
      <button className="btn" onClick={this.renderProfile()} type="button">
        Retry
      </button>
    </div>
  )

  changePackage = e => {
    const packageIs = e.target.value

    this.setState({salaryPackage: packageIs}, this.getJobsList)
  }

  renderSalaryList = each => (
    <li key={each.salaryRangeId}>
      <input
        value={each.salaryRangeId}
        onClick={this.changePackage}
        name="radio-btn"
        id={each.salaryRangeId}
        type="radio"
      />
      <label className="type-label" htmlFor={each.salaryRangeId}>
        {each.label}
      </label>
    </li>
  )

  changeEmployementType = e => {
    const {employementType} = this.state
    const employement = e.target.value
    const updatedArray = [...employementType, employement]
    this.setState({employementType: updatedArray}, this.getJobsList)
  }

  employmentTypesList = each => (
    <li key={each.employmentTypeId}>
      <input
        value={each.employmentTypeId}
        onClick={this.changeEmployementType}
        type="checkbox"
        id={each.employmentTypeId}
      />
      <label className="type-label" htmlFor={each.employmentTypeId}>
        {each.label}
      </label>
    </li>
  )

  onUserSearch = e => {
    this.setState({userSearch: e.target.value})
  }

  renderSearchContainer = () => {
    const {userSearch} = this.state
    return (
      <div className="search-container">
        <input
          value={userSearch}
          onChange={this.onUserSearch}
          className="input-field"
          placeholder="Search"
          type="search"
        />

        <button
          //   testid="searchButton"
          className="search-btn"
          type="button"
          onClick={this.getJobsList}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onJobListApiFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="btn" onClick={this.getJobsList()} type="button">
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderFiltersAndProfile = () => {
    const {profileApiStatus} = this.state
    return (
      <div className="filters-main-bg">
        <div className="search-bg-sm">{this.renderSearchContainer()}</div>
        {profileApiStatus === apiStatusConstants.success &&
          this.onProfileApiSuccess()}
        {profileApiStatus === apiStatusConstants.failure &&
          this.onProfileApiFailure()}
        {profileApiStatus === apiStatusConstants.inProgress &&
          this.renderLoadingView()}

        <hr className="line" />

        <ul className="type-list-ul">
          <h1 className="type-heading">Type of Employment</h1>
          {employmentTypesList.map(each => this.employmentTypesList(each))}
        </ul>
        <hr className="line" />
        <ul className="type-list-ul">
          <h1 className="type-heading">Salary Range</h1>
          {salaryRangesList.map(each => this.renderSalaryList(each))}
        </ul>
      </div>
    )
  }

  renderJobListContainer = () => {
    const {jobListApiStatus, jobsList} = this.state
    return (
      <div className="jobs-list-bg">
        <div className="search-bg-lg">{this.renderSearchContainer()}</div>
        {jobListApiStatus === apiStatusConstants.noJobs &&
          this.renderNoJobsView()}
        {jobListApiStatus === apiStatusConstants.success && (
          <ul className="jobs-list-container">
            {jobsList.map(each => (
              <JobsList key={each.id} details={each} />
            ))}
          </ul>
        )}
        {jobListApiStatus === apiStatusConstants.failure &&
          this.onJobListApiFailure()}
        {jobListApiStatus === apiStatusConstants.inProgress &&
          this.renderLoadingView()}
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-main-bg">
          {this.renderFiltersAndProfile()}
          {this.renderJobListContainer()}
        </div>
      </>
    )
  }
}

export default Jobs
