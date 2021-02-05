import { useState, useEffect, useRef, useContext } from 'react'
import MovieSearch from './MovieSearch'
import MovieCard from './MovieCard'
import { AppContext } from './AppContext'


export default function Movie() {
  const {searchbarText, setSearchbarText, setOldSearchbarText, setMovieID} = useContext(AppContext)

  
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
      setShow(true) // inside click
    } else {
      setShow(false) // outside click
    }
  }
  // ==== END sugeston hide on clic kaway ====

  return (
    <div>
      <MovieSearch {...{show, setShow, suggestionsSelected, node}}/> 
      <MovieCard/>
    </div>
  )
}