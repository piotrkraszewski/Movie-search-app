import React, {useState} from 'react'
import TMDBLogo from './images/tmdb.svg'
import './styles/css/main.css'
import './Search.css'


export default function SearchBox (props) {
  const [suggestions, setSuggestions] = useState([])
  const [text, setText] = useState('')
  const items = ['star Wars', 'star Trek', 'interstellar', 'anime']
  
  const handleClick = e => {
    e.target.select()
  }

  const handleChange = e => {
    const value = e.target.value
    setText(value)
    if (value.length > 0){
      const regex = new RegExp(`^${value}`, 'i')
      const newItems = items.sort().filter(val => regex.test(val))
      setSuggestions(newItems)
    } else {
      setSuggestions([])
    }
  }
  
  const suggestionsSelected = (value) =>{
    setText(value)
    setSuggestions([])
  }

  return (
    <div className='col-xs-12 search-container nopadding'>
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-lg-5'>
          <img src={TMDBLogo} className='logo' alt='The Movie Database' />
        </div>
        <div className='col-xs-12 col-sm-6 col-lg-7'>
          <form className='searchbox'>
            <input
              onClick={handleClick}
              onChange={handleChange}
              className='searchbox__input typeahead form-control myform'
              type='text'
              placeholder='Search Movie Title...'
              // id='q'
              autocomplete="off"
              value={text}
            />
          </form>
        {<ul className='list tt-dropdown-menu '>
          {suggestions.map(i => <li className='tt-suggestion' onClick={()=> suggestionsSelected(i)}>{i}</li>)}
        </ul>}
        </div>
      </div>
    </div>
  )
}