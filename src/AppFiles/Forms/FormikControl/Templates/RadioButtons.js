import { FastField, ErrorMessage} from 'formik'
import ErrorMsg from './ErrorMsg/ErrorMsg'
import PropTypes from 'prop-types'


export default function RadioButtons({label, name, options, ...rest}) {
  return (
    <div className="formControl">
      <label htmlFor={name}>{label}</label>
      <FastField
        name={name}
        {...rest}>
        {
          ({field}) => (
            options.map(option => (
              <div className='RadioBtnDiv' key=
              {option.key}>
                <label className='RadioBtnLabel' htmlFor={option.value}>
                  {option.key}
                </label>
                <input
                  type='radio'
                  id={option.value}
                  {...field} 
                  value={option.value}
                  checked={field.value === option.value} />
              </div>
            ))
          )
        }
      </FastField>
      <ErrorMessage 
        name={name} 
        component={ErrorMsg}/>
    </div>
  )
}


RadioButtons.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}