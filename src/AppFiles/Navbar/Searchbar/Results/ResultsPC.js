import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import s from './ResultsPC.module.scss'
import c from 'styles/helpers/classes.module.sass'
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
      className={`${s.ResultsPC} ` +
      (showQuickSearchRes && searchbarText && c.fadeIn)}
    >
      {displayedSuggestions.map((item, index) =>
        <PosterLi item={item} index={index} />
      )}
      {<li className={s.showMore}>
        <p
          className={`${s.showMoreParagraph} ` +
          (indexOfHighlightedMovie === NUM_OF_DISP_RES_PC && c.ResultsPcHighlight)}
          index={NUM_OF_DISP_RES_PC}
          onMouseEnter={highlightMovieTextOnHover}
          onClick={() => pushToHistory(`/`)}
        >
          show more
        </p>
        <img
          className={s.closeImg}
          src={closeImg}
          onClick={() => setShowQuickSearchRes(false)}
          alt="close search results"
        />
      </li>}
    </ul>
  )
}