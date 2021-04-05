import { motion } from "framer-motion"
import { PAGE_TRANSITION_TIME } from 'Utils/Consts'
import MovieCard from './MovieCard'


export default function MoviePage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay :0.2}}
      exit={{ opacity: 0 }}
      transition={{ duration: PAGE_TRANSITION_TIME }}
    >    
      <MovieCard />
    </motion.div>
  )
}