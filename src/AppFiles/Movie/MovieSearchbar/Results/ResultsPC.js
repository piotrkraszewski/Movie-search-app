import { useContext } from 'react'
import 'styles/main.scss'
import { NUM_OF_DISP_RES_PC } from 'Utils/Consts'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import useHighlightTextInQuickSearch from 'Hooks/SearchbarHooks/useHighlightTextInQuickSearch'
import useCreateArrayToDisplayAndFadeout from 'Hooks/SearchbarHooks/useCreateArrayToDisplayAndFadeout'
import PosterLi from 'ReusableComponents/PosterLi'
import closeImg  from 'Images/close.svg'


export default function MovieSearchbarPCResults() {
  const { showQuickSearchRes, setShowQuickSearchRes, indexOfHighlightedMovie } = useContext(MovieSearchbarContext)
  const { searchbarText, pushToHistory, suggestions } = useContext(AppContext)
  const {highlightMovieTextOnHover} = useHighlightTextInQuickSearch()
  const displayedSuggestions = useCreateArrayToDisplayAndFadeout(suggestions, NUM_OF_DISP_RES_PC, 800)


  return (
    <ul 
      className={'searchbar_ul ' + 
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