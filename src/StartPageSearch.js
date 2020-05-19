import React, {useEffect, useRef, useState} from 'react'
import './styles/main.scss'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'


export default function StartPageSearch(props) {
  const {text, oldText, handleChange, handleClickOnInput} = props

  const [changeStyle, setChangeStyle] = useState(false)
  useScrollPosition(({ prevPos, currPos }) => {
    (currPos.y < -20) ? setChangeStyle(true) : setChangeStyle(false)
    console.log(changeStyle, currPos.y)
  })

  return (
    <div className={'col-lg-6 col-md-8 col-sm-9 col-12 st-search ' + (changeStyle ? 'st-animation' : '')}>
      <div className='row'>
        <div className='col-12' >
          <form onSubmit={e => { e.preventDefault()}}>
            <input
              onChange={handleChange}
              className={'myForm1 ' + (changeStyle ? 'myForm-animation' : '')}
              type='text'
              placeholder='Search Movie Title...'
              value={text !== '' ? text : oldText}
              onClick={handleClickOnInput}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
