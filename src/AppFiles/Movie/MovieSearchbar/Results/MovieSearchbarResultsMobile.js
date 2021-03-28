import { useContext, useState, useEffect, useRef } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { NUM_OF_DISP_SUGGESTIONS_MOBILE, QUICK_SEARCH_TRANSITION } from 'utilities/Consts'
import GotoOtherRoutesHooks from '../Hooks/GotoOtherRoutesHooks'
import { motion, AnimatePresence } from "framer-motion"
import no_image from 'images/no_image.png'


export default function MovieSearchbarResults() {
  const { showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions, pushToHistory } = useContext(AppContext)
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()

  // sets initial height of posters container so buttonts don't drop on poster during transition
  const [divHeight, setDivHeight] = useState()
  const heightRef = useRef(null)
  useEffect(() => {
    if(heightRef.current){
      setDivHeight(heightRef.current.offsetHeight)
    }
  })


  return (
  <div className='searchBarResMobile'>
    <div
      className={'searchbar_container ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      {suggestions.length > 0 //if
      ? //true,  have to return one big fragment <>
      <>  
      <div className='searchbar_div' ref = { heightRef }>
        {suggestions.slice(0, NUM_OF_DISP_SUGGESTIONS_MOBILE)
        .map((item) => 
        <AnimatePresence exitBeforeEnter>
        <motion.div 
          className='smallCard col-4' 
          key={item.id}
          onClick={() => selectedMovieInQuickSearch(item.id)}

          initial={{ opacity: 0, minHeight: divHeight}}
          animate={{ opacity: 1, minHeight: divHeight}}
          exit={{ opacity: 0, minHeight: divHeight }}
          transition={{ duration: QUICK_SEARCH_TRANSITION }}
        >
          <div>
            <img 
              src={item.poster ? item.poster : no_image}
              alt={`poster ${item.id}`}
            />
            <p>{item.title}</p>
          </div>
        </motion.div>
        </AnimatePresence>
        )}
      </div>

        {<div className='searchbar_li'>
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
        </div>}
      </>

      : //else
        searchbarText &&
        <li className=' noResult'>no result</li>
      }
    </div>
  </div>
  )
}