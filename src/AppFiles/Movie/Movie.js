import { useState, useEffect, useRef, useContext } from 'react'
import MovieSearch from './MovieSearchbar'
import MovieCard from './MovieCard'
import { AppContext } from '../AppContext'
import { motion } from "framer-motion"


export default function Movie() {
  const {searchbarText, setSearchbarText, setOldSearchbarText, setMovieID, showResInSearchBar, oldSearchbarText} = useContext(AppContext)


  const suggestionsSelected = value => {
    if (searchbarText && value !== undefined) {
      setOldSearchbarText(searchbarText)
      setSearchbarText('')
      setMovieID(value[1])
    }
  }

// ==== sugeston show and hide on click  ====
  const [show, setShow] = useState(false)
  const node = useRef()

  const hideOnOutsideClick = e => {
    if (!node.current.contains(e.target)){// outside click
      setShow(false) 
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', hideOnOutsideClick)
    return () => {
      // return function to be called when unmounted
      document.removeEventListener('mousedown', hideOnOutsideClick)
    }
  }, [])

  

  const handleClickOnMovieSearchBar = async e => {
    setShow(true)
    if (searchbarText === '') {
      showResInSearchBar(oldSearchbarText)
      setSearchbarText(oldSearchbarText)
      setOldSearchbarText('')
    }
  }
  // ==== END sugeston show and hide on click ====

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >    
      <MovieSearch {...{show, setShow, suggestionsSelected, node,  handleClickOnMovieSearchBar}}/> 
      <MovieCard/>
    </motion.div>
  )
}