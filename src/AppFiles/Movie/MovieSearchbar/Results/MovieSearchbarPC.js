import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { QUICK_SEARCH_TRANSITION } from 'utilities/Consts'
import { motion, AnimatePresence } from "framer-motion"
import NoResult from 'ReusableComponents/NoResult/NoResult'
import MovieSearchbarPCResults from './MovieSearchbarPCResults'


export default function MovieSearchbarPC() {
  const { showNoResults, showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions } = useContext(AppContext)
 

  return (
  <div className='searchBarResPC'>
    <AnimatePresence exitBeforeEnter>
    <motion.div
      key={suggestions.length + showQuickSearchRes}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: QUICK_SEARCH_TRANSITION, ease: 'easeInOut' }}
    >
    {suggestions.length > 0 && showQuickSearchRes
      ? <MovieSearchbarPCResults/>
      : <NoResult 
          className='searchbar_ul'
          fadeInConditionsArr={[showQuickSearchRes, searchbarText, showNoResults]}
          onClose={setShowQuickSearchRes}
          closeBtn={'img'}
        />
      }
    </motion.div>
    </AnimatePresence>
  </div>
  )
}