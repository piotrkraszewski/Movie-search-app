import { useState } from 'react'
import { motion } from "framer-motion"
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { PAGE_TRANSITION_TIME } from 'Utils/Consts'
import MovieSearch from './MovieSearchbar/MovieSearchbar'
import MovieCard from './MovieCard/MovieCard'


export default function MoviePage() {
  const [showQuickSearchRes, setShowQuickSearchRes] = useState(false)
  const [indexOfHighlightedMovie, setIndexOfHighlightedMovie] = useState()

  return (
    <MovieSearchbarContext.Provider value={{ showQuickSearchRes, setShowQuickSearchRes, indexOfHighlightedMovie, setIndexOfHighlightedMovie}}>
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