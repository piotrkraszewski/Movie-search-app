import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { QUICK_SEARCH_TRANSITION } from 'utilities/Consts'
import { motion, AnimatePresence } from "framer-motion"

export default function SearchbarResultsTransitionWraper ({render}) {
  const { showQuickSearchRes } = useContext(MovieSearchbarContext)
  const { suggestions } = useContext(AppContext)

  return (
  <AnimatePresence exitBeforeEnter>
    <motion.div
      key={suggestions.length + showQuickSearchRes}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: QUICK_SEARCH_TRANSITION, ease: 'easeInOut' }}
    >
      {render()}
    </motion.div>
  </AnimatePresence>
  )
}