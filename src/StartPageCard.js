import React, { useState, useEffect, useRef } from 'react'
import './styles/main.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {Route, Link} from 'react-router-dom'

export default function FullscreenSearch(props) {
  let {suggestions, suggestionsSelected} = props

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
    <Route render={({history}) => (

    <div className='row startPage'>
      {suggestions.map((item, index) => 
        <div className='cardContainer col-xl-2 col-md-3 col-4'>
          <Link to='/movie/11'>
            <div className='cardFS' onClick={() => {suggestionsSelected(item)}}>
              <img className='posterImage' src={item[2]}/>
              <h1 className='FS-title'>{item[0]}</h1>
            </div>
          </Link>
      </div>
      )}
  </div>
  )} />
  </CSSTransition>
  </TransitionGroup>
  )
}