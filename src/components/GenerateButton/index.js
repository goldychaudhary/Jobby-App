import './index.css'

const GenerateButton = props => {
  const {children} = props
  return (
    <button type="button" className="btn">
      {children}
    </button>
  )
}

export default GenerateButton
