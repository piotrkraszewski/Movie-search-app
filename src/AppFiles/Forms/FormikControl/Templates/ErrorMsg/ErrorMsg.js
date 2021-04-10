import React from 'react'
import './ErrorMsg.scss'

export default function ErrorMsg({children}) {
  return (
    <div className='error'>
      {children}
    </div>
  )
}
