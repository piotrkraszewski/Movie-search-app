import { useContext } from 'react'
import 'styles/main.scss'
import { NUM_OF_DISP_RES_PC } from 'Utils/Consts'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import HighlightTextInQuickSearchHooks from 'Hooks/SearchbarHooks/useHighlightTextInQuickSearch'
import useCreateArrayToDisplayAndFadeout from 'Hooks/SearchbarHooks/useCreateArrayToDisplayAndFadeout'
import PosterLi from 'ReusableComponents/PosterLi'

export default function MovieSearchbarPCResults() {
  const { showQuickSearchRes, indexOfHighlightedMovie } = useContext(MovieSearchbarContext)
  const { searchbarText, pushToHistory, suggestions } = useContext(AppContext)
  const {highlightMovieTextOnHover} = HighlightTextInQuickSearchHooks()
  const displayedSuggestions = useCreateArrayToDisplayAndFadeout(suggestions, NUM_OF_DISP_RES_PC, 800)

  return (
    <ul 
      className={'searchbar_ul ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      {displayedSuggestions.map((item, index) => 
        <PosterLi item={item} index={index} />
      )}

      {<li className={'searchbar_li showMore ' + 
        (indexOfHighlightedMovie === NUM_OF_DISP_RES_PC && 'active')}

        onMouseEnter={highlightMovieTextOnHover} 
        onClick={() => pushToHistory(`/`)} 
        index={NUM_OF_DISP_RES_PC}
      >
        <p>show more</p>
      </li>}
    </ul>
  )
}