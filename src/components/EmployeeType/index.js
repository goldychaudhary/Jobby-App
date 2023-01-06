const EmployeeType = props => {
  const {details} = props
  const {employmentTypeId, label} = details
  return (
    <li key={employmentTypeId}>
      <input id={employmentTypeId} type="checkbox" />
      <label className="type-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}
export default EmployeeType
