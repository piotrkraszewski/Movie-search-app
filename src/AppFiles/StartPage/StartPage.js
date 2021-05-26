import { useContext } from 'react'
import s from './StartPage.module.sass'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { PAGE_TRANSITION_TIME, START_PAGE_CARDS_TRANSITION } from 'Utils/Consts'
import { motion, AnimatePresence } from "framer-motion"
import PosterCard from 'ReusableComponents/PosterCard/PosterCard'
import useGotoOtherRoutes from 'Hooks/SearchbarHooks/useGotoOtherRoutes'
import useCreateArrayToDisplayAndFadeout from 'Hooks/SearchbarHooks/useCreateArrayToDisplayAndFadeout'


export default function StartPage() {
  const {searchbarText, suggestions, dispPostersNum} = useContext(AppContext)
  const {selectedMovieInStartPage} = useGotoOtherRoutes()
  const displayedSuggestions = useCreateArrayToDisplayAndFadeout(suggestions, 20, 800)


  return (
    <motion.div
      className={s.StartPage}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay :0.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: PAGE_TRANSITION_TIME }}
    >
      <div className={s.Container}>
        <AnimatePresence exitBeforeEnter>
          <motion.p
            key={searchbarText}
            className={s.title}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: START_PAGE_CARDS_TRANSITION, ease: "easeInOut"}}>
              {!searchbarText && 'Trending Now'}
          </motion.p>
        </AnimatePresence>


        <div className={`${s.grid} ${(!suggestions.length && s.fadeout)}`}>
          {displayedSuggestions.slice(0, dispPostersNum).map(item =>
            <PosterCard
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