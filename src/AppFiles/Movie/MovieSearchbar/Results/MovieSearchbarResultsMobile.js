import { useContext, useState, useEffect } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { NUM_OF_DISP_SUGGESTIONS_MOBILE, QUICK_SEARCH_TRANSITION } from 'utilities/Consts'
import GotoOtherRoutesHooks from '../Hooks/GotoOtherRoutesHooks'
import { motion, AnimatePresence } from "framer-motion"
import no_image from 'images/no_image.png'
import ImageFadeIn from "react-image-fade-in";


export default function MovieSearchbarResults() {
  const { showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions, pushToHistory } = useContext(AppContext)
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()

  const [showNoResults, setShowNoResults] = useState(false)

  useEffect(() => {
    console.log(showNoResults)
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
    ? 
    <div
      className={'searchbar_container ' + 
      (showQuickSearchRes && searchbarText !=='' && 'fadeIn')} 
    >
      <div className='searchbar_div'>
        {suggestions.slice(0, NUM_OF_DISP_SUGGESTIONS_MOBILE)
        .map((item) => 
        
        <AnimatePresence exitBeforeEnter >
        <motion.div 
          className='smallCard col-4' 
          key={item.id}
          onClick={() => selectedMovieInQuickSearch(item.id)}

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: QUICK_SEARCH_TRANSITION, ease: 'easeInOut' }}
        >
          <div>
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
        )}
      </div>

      <div className='searchbar_li'>
        <p 
          className='showMoreBtn'
          onClick={() => pushToHistory(`/`)} 
          index={NUM_OF_DISP_SUGGESTIONS_MOBILE}
        >
          show more
        </p>
        <p 
          className='showMoreClose'
          onClick={() => setShowQuickSearchRes(false)}
        >
          close
        </p>
      </div>
      
    </div>
      

    : //else
    searchbarText && 
      <div
        className={'searchbar_container ' + 
        (showQuickSearchRes && searchbarText && showNoResults && 'fadeIn')} 
      >
        <li className=' noResult'>no result</li>
      </div>
    }
    
    </motion.div>
    </AnimatePresence>
  </div>
  )
}