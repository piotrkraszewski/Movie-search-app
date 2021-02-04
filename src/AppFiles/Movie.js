import { useState, useEffect, useRef } from 'react'
import MovieSearch from './MovieSearch'
import MovieCard from './MovieCard'


export default function Movie(props) {
  const {searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, handleChange, handleClickOnInput, queryData, setQueryData, setMovieID, fetchStartPage } = props


  const suggestionsSelected = value => {
    if (searchbarText && value !== undefined) {
      setOldSearchbarText(searchbarText)
      setSearchbarText('')
      setMovieID(value[1])
    }
  }

// ==== sugeston hide on click away ====
  const [show, setShow] = useState(false)
  const node = useRef()

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      // return function to be called when unmounted
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      setShow(true)
    } else {
      // outside click
      setShow(false)
    }
  }
  // ==== END sugeston hide on clic kaway ====

  return (
    <div>
      <MovieSearch {...{show, setShow, searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, suggestionsSelected, handleChange, handleClickOnInput, node, queryData, fetchStartPage, setQueryData}}/> 

      <MovieCard/>
    </div>
  )
}