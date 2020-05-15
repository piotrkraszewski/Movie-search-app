import React, {useEffect, useRef, useState} from 'react'
import TMDBLogo from './images/tmdb.svg'
import './styles/main.scss'
import './Search.css'
import Scroolbar from './Scroolbar/Scroolbar'


export default function SearchBox (props) {
  const {show, text, suggestions, cursor, queryData, showMore, sliceNumber, oldText, node, handleChange, enterPressed, handleClickOnInput, suggestionsSelected, setCursor} = props


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

const onMouseEnterHandle = e => {
  setCursor(parseInt(e.target.getAttribute('index')))
}
// ==== END Podœwietlenie tekstu ====


  // == console log stuff ==
useEffect(() => {
  console.log('queryData.length: ' + queryData.length)
  console.log('suggestions.length: ' + suggestions.length)
  console.log('sliceNumber: ' + sliceNumber)
}, [queryData, sliceNumber])
  // == END console log stuff ==


const renderSugestions = () => {
  if (queryData.length > 0) {
    return (
      <Scroolbar show={show} text={text}>
      <ul 
        className={(show && text) ? 'animate list' : 'list'} >
      {suggestions.map((item, index) => 
        <li 
          className={cursor === index ? 'active tt-suggestion' : 'tt-suggestion'}
          onClick={()=> suggestionsSelected(item)}
          onMouseEnter={onMouseEnterHandle} 
          index={index}
          key={index}
        >
          <div className='row'>
            <img src={item[2]} className='col-lg-2 col-md-3 col-sm-4 col-3 Image'/>
            <p className='col-lg-10 col-md-9 col-sm-8 col-9 textSugestion sugest'>
              {getHighlightedText(item[0], text, index)}
            </p>
          </div>
        </li>)}
        
        <li style={{visibility: queryData.length > suggestions.length ? "visible": "collapse"}}>
          <p 
            onClick={showMore} 
            index={sliceNumber}
            className={cursor === sliceNumber 
            ? 'active textSugestion showMore tt-suggestion' 
            : 'textSugestion showMore tt-suggestion'}
            >
              
              { sliceNumber >= 10 ? 'full search' 
              : suggestions.length > 0 ? 'show more' 
              : 'no result'}
          </p>
        </li>
      </ul>
      </Scroolbar>
    )
  } else {
    if (text) {
      return (
        <ul className='animate list showMore noResult'>
          <li>no result</li>
        </ul>
        )
      } 
  }
}

  return (
    <div className='col-xs-12 search-container nopadding'>
      <div className='row'>
        <div className='col-xs-12 col-sm-3 col-lg-3'>
          <img src={TMDBLogo} className='logo' alt='The Movie Database'/>
        </div>
        <div className='col-xs-12 col-sm-9 col-lg-9 searchInside' ref={node}>
          <form onSubmit={e => { e.preventDefault()}}>
            <input
              onChange={handleChange}
              className='myform'
              type='text'
              placeholder='Search Movie Title...'
              autocomplete="off"
              value={text !== '' ? text : oldText}
              onKeyPress={enterPressed}
              onClick={handleClickOnInput}
            />
          </form>
          {renderSugestions()}
        </div>
      </div>
    </div>
  )
}