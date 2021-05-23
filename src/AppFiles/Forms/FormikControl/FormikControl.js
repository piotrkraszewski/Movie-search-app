import PropTypes from 'prop-types'
import Input from './Templates/Input'
import Select from './Templates/Select'
import Textarea from './Templates/Textarea'
import RadioButtons from './Templates/RadioButtons'
import CheckboxGroup from './Templates/CheckboxGroup'

export default function FormikControl({control, ...rest}) {
  const actions = {
    input: <Input {...rest} />,
    textarea: <Textarea {...rest} />,
    select: <Select {...rest} />,
    radio: <RadioButtons {...rest} />,
    checkbox: <CheckboxGroup {...rest} />,
  }

  return actions[control] ?? null
}

FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
  
  // PropTypes used in children components
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  options: PropTypes.array,
}