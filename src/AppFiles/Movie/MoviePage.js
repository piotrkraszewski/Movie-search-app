import { motion } from "framer-motion"
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { PAGE_TRANSITION_TIME } from 'Utils/Consts'
import MovieSearch from './MovieSearchbar/MovieSearchbar'
import MovieCard from './MovieCard/MovieCard'


import { isMobile } from "react-device-detect"
import {useContext, useState, useEffect} from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { NUM_OF_DISP_RES_MOBILE, NUM_OF_DISP_RES_PC } from 'Utils/Consts'

export default function MoviePage() {
  const [showQuickSearchRes, setShowQuickSearchRes] = useState(false)
  const [indexOfHighlightedMovie, setIndexOfHighlightedMovie] = useState()
  const { searchbarText, suggestions } = useContext(AppContext)

  // makes no result pop after 1s of no receveing info from API
  const [showNoResults, setShowNoResults] = useState(false)
  useEffect(() => {
    if(searchbarText === ''){
      setShowNoResults(false)
    } else {
      const timer = setTimeout(() => {
        setShowNoResults(true)
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchbarText]);


  // makes search results no disappear after are deleted of memory.
  // holds them for 800ms that allows to make smooth transition
  const [cloneSuggestions, setCloneSuggestions] = useState([])


  useEffect(() => {
    const slicedSuggestions = suggestions
    .slice(0, isMobile ? NUM_OF_DISP_RES_MOBILE : NUM_OF_DISP_RES_PC)

    if(suggestions.length > 0){
      setCloneSuggestions(slicedSuggestions)
    } else {
      const timer = setTimeout(() => {
        setCloneSuggestions(slicedSuggestions)
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [suggestions]);


  return (
    <MovieSearchbarContext.Provider value={{ showQuickSearchRes, setShowQuickSearchRes, indexOfHighlightedMovie, setIndexOfHighlightedMovie, showNoResults, cloneSuggestions}}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, delay :0.2}}
        exit={{ opacity: 0 }}
        transition={{ duration: PAGE_TRANSITION_TIME }}
      >    
        <MovieSearch /> 
        <MovieCard />
      </motion.div>
    </MovieSearchbarContext.Provider>
  )
}