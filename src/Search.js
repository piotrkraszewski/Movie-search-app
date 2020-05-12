import React, {useEffect, useRef, useState} from 'react'
import TMDBLogo from './images/tmdb.svg'
import './styles/css/main.css'
import './Search.css'

export default function SearchBox (props) {

// ==== Podœwietlenie tekstu ====
function getHighlightedText(text, highlight, index) {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <span> { parts.map((part, i) => 
    <span 
      key={i} 
      style=
      {(part.toLowerCase() === highlight.toLowerCase() && props.cursor !== index)
        ? { color: '#00FC87', fontWeight: 'bold' } 
        : part.toLowerCase() === highlight.toLowerCase() 
          ? { fontWeight: 'bold'}
          : {}} 
    >
        { part }
    </span>)
  } </span>;
}
// ==== END Podœwietlenie tekstu ====

const onMouseEnterHandle = e => {
  props.setCursor(parseInt(e.target.getAttribute('index')))
}

  
  
  
  
  
const renderSugestions = () => {
  return (
    <ul className={(props.show && props.text) ? 'animate list tt-dropdown-menu' : 'animateOut list tt-dropdown-menu'} >
    {props.suggestions.map((item, index) => 
      <li 
        className={props.cursor === index ? 'active tt-suggestion' : 'tt-suggestion'}
        onClick={()=> props.suggestionsSelected(item)}
        onMouseEnter={onMouseEnterHandle} 
        index={index}
        key={index}
      >
        <div className='row'>
          <img src={item[2]} alt='' className='Image col-lg-2 col-md-3 col-sm-4 col-2'/>
          <p className='col-lg-10 col-md-9 col-sm-8 col-10 textSugestion sugest'>
            {getHighlightedText(item[0], props.text, index)}
          </p>
        </div>
      </li>)}
      <li><p 
      onClick={props.showMore} 
      index={props.sliceNumber}
      className={props.cursor === props.sliceNumber ?'active textSugestion showMore tt-suggestion' : 'textSugestion showMore tt-suggestion'}>
        {props.suggestions.length > 0 ? 'show more' : 'no result'}
      </p></li>
    </ul>
  )
}

  return (
    <div className='col-xs-12 search-container nopadding'>
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-lg-5'>
          <img src={TMDBLogo} className='logo' alt='The Movie Database' />
        </div>
        <div className='col-xs-12 col-sm-6 col-lg-7' ref={props.node}>
          <form className='searchbox' onSubmit={e => { e.preventDefault()}}>
            <input
              onChange={props.handleChange}
              className='searchbox__input typeahead myform'
              type='text'
              placeholder='Search Movie Title...'
              autocomplete="off"
              value={props.text !== '' ? props.text : props.oldText}
              onKeyPress={props.enterPressed}
              onClick={props.handleClickOnInput}
            />
          </form>
          {renderSugestions()}
        </div>
      </div>
    </div>
  )
}