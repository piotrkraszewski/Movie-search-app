import { FastField, ErrorMessage} from 'formik'
import ErrorMsg from './ErrorMsg/ErrorMsg'
import PropTypes from 'prop-types'
import s from './Input.module.scss';

export default function Input({label, name, type, ...rest}) {
  return (
    <div className={s.formControl}>
      <label htmlFor={name}>{label}</label>
      <FastField
        id={name}
        name={name}
        type={type}
        {...rest} />
      <ErrorMessage
        name={name}
        component={ErrorMsg}/>
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
}