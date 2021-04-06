import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import 'styles/main.scss'
import { NUM_OF_DISP_RES_PC } from 'Utils/Consts'
import useHighlightTextInQuickSearch from 'Hooks/SearchbarHooks/useHighlightTextInQuickSearch'
import useCreateArrayToDisplayAndFadeout from 'Hooks/SearchbarHooks/useCreateArrayToDisplayAndFadeout'
import PosterLi from 'ReusableComponents/PosterLi/PosterLi'
import closeImg  from 'Images/close.svg'


export default function ResultsPC() {
  const { searchbarText, pushToHistory, suggestions, showQuickSearchRes, setShowQuickSearchRes, indexOfHighlightedMovie  } = useContext(AppContext)
  const {highlightMovieTextOnHover} = useHighlightTextInQuickSearch()
  const displayedSuggestions = useCreateArrayToDisplayAndFadeout(suggestions, NUM_OF_DISP_RES_PC, 800)


  return (
    <ul 
      className={'ResultsPC ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      {displayedSuggestions.map((item, index) => 
        <PosterLi item={item} index={index} />
      )}

      {<li className='showMore'>
        <p
          className={'showMoreParagraph ' + 
          (indexOfHighlightedMovie === NUM_OF_DISP_RES_PC && 'active')}
          // index={NUM_OF_DISP_RES_PC}
          onMouseEnter={highlightMovieTextOnHover}
          onClick={() => pushToHistory(`/`)} 
        >
          show more
        </p>
        <img 
          className='closeImg'
          src={closeImg} 
          onClick={() => setShowQuickSearchRes(false)}
          alt="close search results"
        />
      </li>}
    </ul>
  )
}