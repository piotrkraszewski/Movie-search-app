import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { NUM_OF_DISP_SUGGESTIONS_PC, QUICK_SEARCH_TRANSITION } from 'utilities/Consts'
import HighlightTextInQuickSearchHooks from '../Hooks/HighlightTextInQuickSearchHooks'
import GotoOtherRoutesHooks from '../Hooks/GotoOtherRoutesHooks'
import { motion, AnimatePresence } from "framer-motion"
import ImageFadeIn from "react-image-fade-in";
import no_image from 'images/no_image.png'


export default function MovieSearchbarResults() {
  const { showQuickSearchRes, indexOfHighlightedMovie } = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions, pushToHistory } = useContext(AppContext)

  const {highligthText, highlightMovieTextOnHover} = HighlightTextInQuickSearchHooks()
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()


  return (
  <div className='searchBarResPC'>
    <ul 
      className={'searchbar_ul ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      {suggestions.length > 0 && showQuickSearchRes //if
      ? //true,  have to return one big fragment <>
      <>  
        {suggestions.slice(0, NUM_OF_DISP_SUGGESTIONS_PC)
        .map((item, index) => 
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
        )}

        {<li className={'searchbar_li showMore ' + 
          (indexOfHighlightedMovie === NUM_OF_DISP_SUGGESTIONS_PC && 'active')}

          onMouseEnter={highlightMovieTextOnHover} 
          onClick={() => pushToHistory(`/`)} 
          index={NUM_OF_DISP_SUGGESTIONS_PC}
        >
          <p>show more</p>
        </li>}
      </>

      : //else
        searchbarText &&
        <p className='searchbar_li showMore noResult'>no result</p>
      }
    </ul>
  </div>
  )
}