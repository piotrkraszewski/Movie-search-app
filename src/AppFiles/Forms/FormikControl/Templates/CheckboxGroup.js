import { FastField, ErrorMessage} from 'formik'
import ErrorMsg from './ErrorMsg/ErrorMsg'
import PropTypes from 'prop-types'


export default function CheckboxGroup({label, name, options, ...rest}) {
  return (
    <div className="formControl">
      <label htmlFor={name}>{label}</label>
      <FastField
        name={name}
        {...rest}>
        {
          ({field}) =>{
          // console.log('field', field)
           return(
            options.map(option => (
              <div key={option.key}>
                <input
                  type='checkbox'
                  id={option.value}
                  {...field} 
                  value={option.value}
                  checked={field.value && field.value.includes(option.value)} 
                />
                <label htmlFor={option.value}>
                  {option.key}
                </label>
              </div>
            ))
          )}
        }
      </FastField>
      <ErrorMessage 
        name={name} 
        component={ErrorMsg}/>
    </div>
  )
}


CheckboxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}