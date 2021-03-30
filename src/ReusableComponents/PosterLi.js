import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { QUICK_SEARCH_TRANSITION } from 'utilities/Consts'
import HighlightTextInQuickSearchHooks from '../AppFiles/Movie/MovieSearchbar/Hooks/HighlightTextInQuickSearchHooks'
import GotoOtherRoutesHooks from '../AppFiles/Movie/MovieSearchbar/Hooks/GotoOtherRoutesHooks'
import { motion, AnimatePresence } from "framer-motion"
import ImageFadeIn from "react-image-fade-in"
import no_image from 'images/no_image.png'

export default function PosterLi({item, index}) {
  const { indexOfHighlightedMovie } = useContext(MovieSearchbarContext)
  const { searchbarText } = useContext(AppContext)

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
