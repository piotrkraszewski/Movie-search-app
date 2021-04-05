import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { QUICK_SEARCH_TRANSITION } from 'Utils/Consts'
import HighlightTextInQuickSearchHooks from '../Hooks/SearchbarHooks/useHighlightTextInQuickSearch'
import GotoOtherRoutesHooks from '../Hooks/SearchbarHooks/useGotoOtherRoutes'
import { motion, AnimatePresence } from "framer-motion"
import ImageFadeIn from "react-image-fade-in"
import no_image from 'Images/no_image.png'
import PropTypes from 'prop-types'


PosterLi.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}

export default function PosterLi({item, index}) {
  const { searchbarText, indexOfHighlightedMovie} = useContext(AppContext)

  const {highligthText, highlightMovieTextOnHover} = HighlightTextInQuickSearchHooks()
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()


  return (
    <AnimatePresence exitBeforeEnter>
      <motion.li 
        className={'searchbar_li ' + 
        (indexOfHighlightedMovie === index && 'active')}

        onClick={() => selectedMovieInQuickSearch(item.id)}
        onMouseEnter={highlightMovieTextOnHover} 
        index={index}
        key={item.id}

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: QUICK_SEARCH_TRANSITION }}
      >
        <div className='row'>
          <ImageFadeIn 
            className='col-lg-2 col-md-3 col-sm-4 col-3'
            width='500'
            height='750'
            opacityTransition={0.5}
            src={item.poster ? item.poster : no_image} 
            alt={`poster ${item.id}`}
          />
          <p className='col-lg-10 col-md-9 col-sm-8 col-9'>
            {highligthText(item.title, searchbarText, index)}
          </p>
        </div>
      </motion.li>
      </AnimatePresence>
  )
}