import { useState } from 'react'
import { MovieSearchbarContext } from '../Contexts/MovieSearchbarContext'
import MovieSearch from './MovieSearchbar/MovieSearchbar'
import MovieCard from './MovieCard/MovieCard'
import { motion } from "framer-motion"


export default function Movie() {
  const [showQuickSearchRes, setShowQuickSearchRes] = useState(false)

  // "cursor" track which "li" is highlighted. 
  // It represents index which we can use to get movie id from already fetched movies data
  const [cursor, setCursor] = useState()  // current highlighted movie

  return (
    <MovieSearchbarContext.Provider value={{ showQuickSearchRes, setShowQuickSearchRes, cursor, setCursor}}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >    
        <MovieSearch /> 
        <MovieCard />
      </motion.div>
    </MovieSearchbarContext.Provider>
  )
}