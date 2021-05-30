import React from 'react'
import DropdownList from "react-widgets/DropdownList"
import PropTypes from 'prop-types'


DropdownList.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  disabled: PropTypes.array,
}


export default function DropdownListTemplate(
  { className, label, value, onChangeFunc, data, disabled })
{
  return (
    <div className={className}>
      <p>{label}</p>
      <DropdownList
        filter={false}  // prevents from writing in box
        value={value}
        onChange={onChangeFunc}
        textField="color"
        data={data}
        disabled={disabled}
      />
    </div>
  )
}
