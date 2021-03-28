import { useContext } from 'react'
import no_image from 'images/no_image.png'
import { PAGE_TRANSITION_TIME, START_PAGE_CARDS_TRANSITION } from 'utilities/Consts'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { motion, AnimatePresence } from "framer-motion"
import ImageFadeIn from "react-image-fade-in";


export default function StartPageCard ({item}) {
  const { pushToHistory, scrollBarRef } = useContext(AppContext)

  // !!!  probably move to one component because it creats duplication in memory !!!
  function selectedMovieInCardsPage(id){
    pushToHistory(`/movie/${id}`)
    setTimeout(() => {
      // moves ScrollBar to top
      scrollBarRef.current._ps.element.scrollTop = 0  
      // console.log(" scrollBarRef", scrollBarRef.current._ps)
    }, PAGE_TRANSITION_TIME * 1000) // exit animation length
  }

  return (
  <AnimatePresence exitBeforeEnter>
    <motion.div
      className='smallCard col-xl-2 col-md-3 col-4'
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: START_PAGE_CARDS_TRANSITION, ease: 'easeInOut' }}
    >
      <div onClick={() => selectedMovieInCardsPage(item.id)}>
          <ImageFadeIn
            height='750'
            width='500'
            opacityTransition={0.5}
            src={item.poster ? item.poster : no_image}
            alt={`poster ${item.id}`}
          />
        <p>{item.title}</p>
      </div>
    </motion.div>
  </AnimatePresence>
  )
}
