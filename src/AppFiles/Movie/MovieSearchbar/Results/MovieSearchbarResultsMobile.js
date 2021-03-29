import { useContext, useState, useEffect } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { QUICK_SEARCH_TRANSITION } from 'utilities/Consts'
import { motion, AnimatePresence } from "framer-motion"
import NoResult from './NoResult'
import ResultsMobile from './ResultsMobile'



export default function MovieSearchbarResults() {
  const { showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions } = useContext(AppContext)

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


  return (
  <div className='searchBarResMobile'>
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={suggestions.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: QUICK_SEARCH_TRANSITION, ease: 'easeInOut' }}
      >
        {suggestions.length > 0 //if
        ? <ResultsMobile/>
        : //else
        searchbarText && 
          <div
            className={'searchbar_container noResultContainer ' + 
            (showQuickSearchRes && searchbarText && showNoResults && 'fadeIn')} 
          >
            <NoResult onClose={setShowQuickSearchRes}/>
          </div>
        }
      </motion.div>
    </AnimatePresence>
  </div>
  )
}