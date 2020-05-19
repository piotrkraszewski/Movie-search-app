import React, { useState, useEffect, useRef } from 'react'
import './styles/main.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {Route, Link} from 'react-router-dom'

export default function FullscreenSearch(props) {
  let {suggestions, suggestionsSelectedFullscreen} = props

  return (
    <TransitionGroup className='TransitionGroup'>
    <CSSTransition 
      key={props.movieID}
      timeout={2000}
      classNames='fade'
    >

    <div className='row startPage'>
      {suggestions.map((item, index) => 
        <div className='cardContainer col-xl-2 col-md-3 col-4'>
          <Link to={`/movie/${item[1]}`} className='linkStyle'>
            <div className='cardFS' onClick={() => suggestionsSelectedFullscreen(item)}>
              <img className='posterImage' src={item[2] !== 'https://image.tmdb.org/t/p/w500null' ? item[2] : require('./images/no_image.png')}/>
              <h1 className='FS-title'>{item[0]}</h1>
            </div>
          </Link>
      </div>
      )}
  </div>
  </CSSTransition>
  </TransitionGroup>
  )
}