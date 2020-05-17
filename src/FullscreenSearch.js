import React, { useState, useEffect, useRef } from 'react'
import './styles/main.scss'
import numeral from 'numeral'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default function FullscreenSearch(props) {
  let {suggestions} = props

  // useEffect(() => {
  //   document.body.style.backgroundImage = '#222'
  // })

  const handleClickOnMovie = () =>{

  }

  return (
    <TransitionGroup className='TransitionGroup'>
    <CSSTransition 
      key={props.movieID}
      timeout={2000}
      classNames='fade'
    >
    <div className='row'>
      {suggestions.map((item, index) => 
        <div className='cardContainer col-xl-2 col-md-3 col-4'>
          <div className='cardFS' onClick={handleClickOnMovie}>
            <img className='posterImage' src={item[2]}/>
            <h1 className='FS-title'>{item[0]}</h1>
          </div>
      </div>
    )}
      </div>
  </CSSTransition>
  </TransitionGroup>
  )
}
