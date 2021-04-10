import { FastField, ErrorMessage} from 'formik'
import ErrorMsg from './ErrorMsg/ErrorMsg'
import PropTypes from 'prop-types'


export default function Textarea({label, name, ...rest}) {
  return (
    <div className="formControl">
      <label htmlFor={name}>{label}</label>
      <FastField
        as='textarea'
        id={name}
        name={name}
        {...rest}/>
      <ErrorMessage 
        name={name} 
        component={ErrorMsg}/>
    </div>
  )
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}