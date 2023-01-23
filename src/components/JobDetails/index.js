import {Component} from 'react'
import {MdLocationOn} from 'react-icons/md'
import {BsFillStarFill} from 'react-icons/bs'
import {FaBriefcase, FaExternalLinkAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

class JobDetails extends Component {
  state = {jobDetails: {}, skills: [], similarJobsList: [], apiFail: false}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedJobsDetails = {
        companyLogo: data.job_details.company_logo_url,
        companyUrl: data.job_details.company_website_url,
        employementType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImage: data.job_details.life_at_company.image_url,
      }

      const skillsList = data.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      const similarJobs = data.similar_jobs.map(each => ({
        companyUrl: each.company_logo_url,
        employementType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails: updatedJobsDetails,
        skills: skillsList,
        similarJobsList: similarJobs,
      })
    } else {
      this.setState({apiFail: true})
    }
  }

  renderApiFailureView = () => (
    <div className="failure-view-main-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="btn" onClick={this.getJobDetails} type="button">
        Retry
      </button>
    </div>
  )

  renderSkills = each => (
    <li key={each.name} className="skill-item">
      <img src={each.imageUrl} alt={each.name} className="skill-pic" />
      <p>{each.name}</p>
    </li>
  )

  renderLifeAtCompany = () => {
    const {jobDetails} = this.state

    return (
      <div className="life-at-company-container">
        <div className="lifeAtCompany-content-bg">
          <p className="description-para">
            {jobDetails.lifeAtCompanyDescription}
          </p>
        </div>
        <div className="lifeAtCompany-pic-bg">
          <img src={jobDetails.lifeAtCompanyImage} alt="" />
        </div>
      </div>
    )
  }

  renderSimilarJobs = each => (
    <li key={each.id} className="similar jobs-card">
      <div className="company-logo-container">
        <img
          className="company-logo"
          src={each.companyUrl}
          alt="similar job company logo"
        />
        <div className="job-name-container">
          <h1 className="job-card-name">{each.title}</h1>
          <div className="icon-plus-para">
            <BsFillStarFill className="star-icons" />
            <p className="location">{each.rating}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="location-type-salary-container">
          <div className="icon-plus-para">
            <MdLocationOn />
            <p className="location">{each.location}</p>
          </div>
          <div className="icon-plus-para">
            <FaBriefcase />
            <p className="location">{each.employementType}</p>
          </div>
        </div>
        <hr className="line" />
        <h1 className="job-card-name">Description</h1>
        <p className="description-para">{each.jobDescription}</p>
      </div>
    </li>
  )

  render() {
    const {jobDetails, skills, similarJobsList, apiFail} = this.state

    if (apiFail === true) {
      return this.renderApiFailureView()
    }

    return (
      <div className="job-details-main-bg">
        <div className="jobs-details-container">
          <div className="company-logo-container">
            <img
              className="company-logo"
              src={jobDetails.companyLogo}
              alt="job details company logo"
            />
            <div className="job-name-container">
              <h1 className="job-card-name">{jobDetails.title}</h1>
              <div className="icon-plus-para">
                <BsFillStarFill className="star-icons" />
                <p className="location">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="location-type-salary-container">
              <div className="icon-plus-para">
                <MdLocationOn />
                <p className="job-card-name location">{jobDetails.location}</p>
              </div>
              <div className="icon-plus-para">
                <FaBriefcase />
                <p className="job-card-name location">
                  {jobDetails.employementType}
                </p>
              </div>
              <p className="package">{jobDetails.packagePerAnnum}</p>
            </div>
            <hr className="line" />
            <div className="company-url-container">
              <h1 className="job-card-name">Description</h1>
              <div className="website-external-link-cotainer">
                <a
                  className="external-link"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={jobDetails.companyUrl}
                >
                  Visit
                </a>
                <FaExternalLinkAlt />
              </div>
            </div>
            <p className="description-para">{jobDetails.jobDescription}</p>
          </div>
          <h1 className="job-card-name">Skills</h1>
          <ul className="skills-container">
            {skills.map(each => this.renderSkills(each))}
          </ul>
          <h1 className="life-at-c job-card-name">Life at Company</h1>
          {this.renderLifeAtCompany()}
        </div>
        <div className="similar-jobs-heading-container">
          <h1>Similar Jobs</h1>
        </div>
        <ul className="similar-jobs-container">
          {similarJobsList.map(each => this.renderSimilarJobs(each))}
        </ul>
      </div>
    )
  }
}
export default JobDetails
