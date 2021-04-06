import { useContext } from 'react'
import 'styles/main.scss'
import { NUM_OF_DISP_RES_MOBILE, QUICK_SEARCH_TRANSITION } from 'Utils/Consts'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import useCreateArrayToDisplayAndFadeout from 'Hooks/SearchbarHooks/useCreateArrayToDisplayAndFadeout'
import GotoOtherRoutesHooks from 'Hooks/SearchbarHooks/useGotoOtherRoutes'
import PosterCard from 'ReusableComponents/PosterCard/PosterCard'


export default function ResultsMobile() {
  const { searchbarText, pushToHistory, suggestions, showQuickSearchRes, setShowQuickSearchRes } = useContext(AppContext)
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()
  const displayedSuggestions = useCreateArrayToDisplayAndFadeout(suggestions, NUM_OF_DISP_RES_MOBILE, 800)

  return (
    <div
      className={'ResultsMobile ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      <div className='searchbar_div'>
        {displayedSuggestions.map(item => 
          <PosterCard 
            className='col-4'
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