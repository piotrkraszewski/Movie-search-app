import { useContext, useState, useEffect } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { NUM_OF_DISP_SUGGESTIONS_MOBILE, QUICK_SEARCH_TRANSITION } from 'utilities/Consts'
import GotoOtherRoutesHooks from '../Hooks/GotoOtherRoutesHooks'
import PosterCard from 'utilities/PosterCard'


export default function ResultsMobile() {
  const { showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions, pushToHistory } = useContext(AppContext)
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()

  const [cloneSuggestions, setCloneSuggestions] = useState([])

  // makes search results no disappear after are deleted of memory.
  // holds them for 800ms
  useEffect(() => {
    const slicedSuggestions = suggestions.slice(0, NUM_OF_DISP_SUGGESTIONS_MOBILE)
    if(suggestions.length > 0){
      setCloneSuggestions(slicedSuggestions)
    } else {
      const timer = setTimeout(() => {
        setCloneSuggestions(slicedSuggestions)
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [suggestions]);


  return (
    <div
      className={'searchbar_container ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      <div className='searchbar_div'>
        {cloneSuggestions.map(item => 
          <PosterCard 
            className='smallCard col-4'
            cardData={item} 
            onClick={selectedMovieInQuickSearch}
            cardTransitionDuration={QUICK_SEARCH_TRANSITION}
            imgTransition={0.5}
            imgHeight={'750'}
            imgWidth={'500'}
          />
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
  )
}