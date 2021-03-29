import { useContext} from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { START_PAGE_CARDS_TRANSITION } from 'utilities/Consts'
import { motion, AnimatePresence } from "framer-motion"
import StartPageCard from './StartPageCard'


export default function StartPageCards() {
  const {searchbarText, suggestions, dispPostersNum} = useContext(AppContext)

  return (
    <div className='StartPageCards'>
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
          <StartPageCard item={item} key={item.id} />
        )}
      </div>
    </div>
  </div>
  )
}