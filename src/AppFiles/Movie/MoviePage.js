import { useState } from 'react'
import { MovieSearchbarContext } from '../Contexts/MovieSearchbarContext'
import MovieSearch from './MovieSearchbar/MovieSearchbar'
import MovieCard from './MovieCard/MovieCard'
import { motion } from "framer-motion"


export default function Movie() {
  const [show, setShow] = useState(false)

  return (
    <MovieSearchbarContext.Provider value={{show, setShow}}>
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