import PropTypes from 'prop-types'
import Input from './Templates/Input'
import Select from './Templates/Select'
import Textarea from './Templates/Textarea'
import RadioButtons from './Templates/RadioButtons'
import CheckboxGroup from './Templates/CheckboxGroup'

export default function FormikControl({control, ...rest}) {
  switch(control) {
    case 'input': return <Input {...rest} />
    case 'textarea': return <Textarea {...rest} />
    case 'select': return <Select {...rest} />
    case 'radio': return <RadioButtons {...rest} />
    case 'checkbox': return <CheckboxGroup {...rest} />
    default: return null
  }
}

FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
  
  // PropTypes used in children components
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  options: PropTypes.array,
}