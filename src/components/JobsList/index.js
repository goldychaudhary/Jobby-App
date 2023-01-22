import {MdLocationOn} from 'react-icons/md'
import {BsFillStarFill} from 'react-icons/bs'
import {FaBriefcase} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const JobList = props => {
  const {details} = props
  const {
    companyLogo,
    title,
    rating,
    location,
    employementType,
    packagePerAnnum,
    jobDescription,
    id,
  } = details

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <li className="jobs-card">
        <div className="company-logo-container">
          <img className="company-logo" src={companyLogo} alt="company logo" />
          <div className="job-name-container">
            <h1 className="job-card-name">{title}</h1>
            <div className="icon-plus-para">
              <BsFillStarFill className="star-icons" />
              <p className="location">{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="location-type-salary-container">
            <div className="icon-plus-para">
              <MdLocationOn />
              <p className="location">{location}</p>
            </div>
            <div className="icon-plus-para">
              <FaBriefcase />
              <p className="location">{employementType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="line joblist-line" />
          <h1 className="job-card-name">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobList
