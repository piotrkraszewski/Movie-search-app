import { useState } from 'react'
import { motion } from "framer-motion"
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import MovieSearch from './MovieSearchbar/MovieSearchbar'
import MovieCard from './MovieCard/MovieCard'


export default function Movie() {
  const [showQuickSearchRes, setShowQuickSearchRes] = useState(false)
  const [indexOfHighlightedMovie, setIndexOfHighlightedMovie] = useState()

  return (
    <MovieSearchbarContext.Provider value={{ showQuickSearchRes, setShowQuickSearchRes, indexOfHighlightedMovie, setIndexOfHighlightedMovie}}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, delay :0.2}}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >    
        <MovieSearch /> 
        <MovieCard />
      </motion.div>
    </MovieSearchbarContext.Provider>
  )
}