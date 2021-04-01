import { useContext } from 'react'
import 'styles/main.scss'
import { NUM_OF_DISP_RES_MOBILE, QUICK_SEARCH_TRANSITION } from 'Utils/Consts'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import useCreateArrayToDisplayAndFadeout from 'Hooks/SearchbarHooks/useCreateArrayToDisplayAndFadeout'
import GotoOtherRoutesHooks from 'Hooks/SearchbarHooks/useGotoOtherRoutes'
import PosterCard from 'ReusableComponents/PosterCard'


export default function MovieSearchbarMobileResults() {
  const { showQuickSearchRes, setShowQuickSearchRes } = useContext(MovieSearchbarContext)
  const { searchbarText, pushToHistory, suggestions } = useContext(AppContext)
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()
  const displayedSuggestions = useCreateArrayToDisplayAndFadeout(suggestions, NUM_OF_DISP_RES_MOBILE, 800)

  return (
    <div
      className={'searchbar_container ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      <div className='searchbar_div'>
        {displayedSuggestions.map(item => 
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
          index={NUM_OF_DISP_RES_MOBILE}
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