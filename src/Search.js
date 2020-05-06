import React, {useEffect, useRef, useState} from 'react'
import TMDBLogo from './images/tmdb.svg'
import './styles/css/main.css'
import './Search.css'

export default function SearchBox (props) {
  // ==== sugeston hide on click away ====
  const [show, setShow] = useState(true)
  const node = useRef()
  
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (node.current.contains(e.target)) { // inside click
      setShow(true)
    } else {                               // outside click 
      setShow(false)
    }
  };
   // ==== END sugeston hide on clic kaway ====

  
const renderSugestions = () => {
  return (
    <div style={{visibility: show ? "visible" : "hidden"}}>
      <ul className='list tt-dropdown-menu '>
      {props.suggestions.map((item, index) => 
        <li 
          className={props.cursor === index ? 'active tt-suggestion' : 'tt-suggestion'}
          onClick={()=> props.suggestionsSelected(item)}
        >
          {item[0]}
        </li>)}
      </ul>
    </div>
  )
}

  return (
    <div className='col-xs-12 search-container nopadding'>
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-lg-5'>
          <img src={TMDBLogo} className='logo' alt='The Movie Database' />
        </div>
        <div className='col-xs-12 col-sm-6 col-lg-7' ref={node}>
          <form className='searchbox' onSubmit={e => { e.preventDefault()}}>
            <input
              onChange={props.handleChange}
              className='searchbox__input typeahead myform'
              type='text'
              placeholder='Search Movie Title...'
              autocomplete="off"
              value={props.text}
              onKeyPress={props.enterPressed}
            />
          </form>
          {renderSugestions()}
        </div>
      </div>
    </div>
  )
}