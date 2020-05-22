import React, { useState, useEffect, useRef } from 'react'
import MovieSearch from './MovieSearch'
import MovieCard from './MovieCard'
import axios from 'axios'


export default function Movie(props) {
  const {movieID, text, setText, oldText, setOldText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, handleChange, handleClickOnInput, queryData, setMovieID, data,fetchStartPage } = props
  // const movieID = parseInt(routeProps)


  const suggestionsSelected = value => {
    if (text && value !== undefined) {
      setOldText(text)
      setText('')
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
      <MovieSearch {...{show, setShow, text, setText, oldText, setOldText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, suggestionsSelected, handleChange, handleClickOnInput, node, queryData, fetchStartPage}}/> 

      <MovieCard {...{data, movieID}} />
    </div>
  )
}