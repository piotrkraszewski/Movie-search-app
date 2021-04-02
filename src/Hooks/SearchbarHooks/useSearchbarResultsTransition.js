import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { QUICK_SEARCH_TRANSITION } from 'Utils/Consts'
import { motion, AnimatePresence } from "framer-motion"

export default function UseSearchbarResultsTransition (Component) {
  const { showQuickSearchRes } = useContext(MovieSearchbarContext)
  const { suggestions } = useContext(AppContext)

  return (
  <AnimatePresence exitBeforeEnter>
    <motion.div
      key={suggestions.length + showQuickSearchRes}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        // turnary showQuickSearchRes makse results show instantly after clicking searchbar. 
        // suggestions.length > 0 speeds showing when we type first letter in searchbar
        // normally we would have QUICK_SEARCH_TRANSITION delay 
        duration: (showQuickSearchRes && suggestions.length > 0)
                  ? QUICK_SEARCH_TRANSITION : 0, 
        ease: 'easeInOut' 
      }}
    >
      {Component}
    </motion.div>
  </AnimatePresence>
  )
}