import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { QUICK_SEARCH_TRANSITION } from 'Utils/Consts'
import { motion, AnimatePresence } from "framer-motion"

export default function UseSearchbarResultsTransition (Component) {
  const { showQuickSearchRes } = useContext(MovieSearchbarContext)
  const { suggestions } = useContext(AppContext)

  console.log('helo')
  return (
  <AnimatePresence exitBeforeEnter>
    <motion.div
      key={suggestions.length + showQuickSearchRes}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: QUICK_SEARCH_TRANSITION, ease: 'easeInOut' }}
    >
      {Component}
    </motion.div>
  </AnimatePresence>
  )
}