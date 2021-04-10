import { FastField, ErrorMessage} from 'formik'
import ErrorMsg from './ErrorMsg/ErrorMsg'
import PropTypes from 'prop-types'


export default function Select({label, name, options, ...rest}) {
  return (
    <div className="formControl">
      <label htmlFor={name}>{label}</label>
      <FastField
        as='select'
        id={name}
        name={name}
        {...rest}>
        {
          options.map(option => (
            <option 
              key={option.value}
              value={option.value}>
              {option.key}
            </option>
          ))
        }
      </FastField>
      <ErrorMessage 
        name={name} 
        component={ErrorMsg}/>
    </div>
  )
}


Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}