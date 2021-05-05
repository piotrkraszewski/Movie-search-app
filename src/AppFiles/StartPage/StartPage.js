import { useContext } from 'react'
import './StartPage.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { PAGE_TRANSITION_TIME, START_PAGE_CARDS_TRANSITION } from 'Utils/Consts'
import { motion, AnimatePresence } from "framer-motion"
import PosterCard from 'ReusableComponents/PosterCard/PosterCard'
import useGotoOtherRoutes from 'Hooks/SearchbarHooks/useGotoOtherRoutes'


export default function StartPageCards() {
  const {searchbarText, suggestions, dispPostersNum} = useContext(AppContext)
  const {selectedMovieInStartPage} = useGotoOtherRoutes()


  return (
    <motion.div 
      className='StartPageCards'

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay :0.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: PAGE_TRANSITION_TIME }}
    > 
      <div className='Container'>
      <AnimatePresence exitBeforeEnter>
        <motion.p
          key={searchbarText}
          className='title'
          
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          exit={{ opacity: 0 }}
          transition={{ duration: START_PAGE_CARDS_TRANSITION, ease: "easeInOut"}}>
            {!searchbarText && 'Trending Now'}
        </motion.p>
      </AnimatePresence>


      <div className='row'>
        {suggestions.slice(0, dispPostersNum).map(item => 
          <PosterCard 
            className='col-xl-2 col-md-3 col-4'
            cardData={item} 
            onClick={selectedMovieInStartPage}
            cardTransitionDuration={START_PAGE_CARDS_TRANSITION}
            imgTransition={0.5}
            imgHeight={'750'}
            imgWidth={'500'}
          />
        )}
      </div>
    </div>
  </motion.div> 
  )
}