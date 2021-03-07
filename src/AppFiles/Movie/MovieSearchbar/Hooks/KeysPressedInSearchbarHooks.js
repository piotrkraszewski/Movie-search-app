import { useContext } from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import { AppContext } from '../../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../../Contexts/MovieSearchbarContext'
import { NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH } from '../../../../utilities/Consts'
import GotoOtherRoutesHooks from './GotoOtherRoutesHooks'

export default function KeysPressedInSearchbarHooks() {
  const { suggestions, pushToHistory} = useContext(AppContext)
  const { showQuickSearchRes, setShowQuickSearchRes, indexOfHighlightedMovie, setIndexOfHighlightedMovie } = useContext(MovieSearchbarContext)

  const [selectedMovieInQuickSearch] = GotoOtherRoutesHooks()
  
  
  function enterKeyInSearchbar(e){
    const code = e.keyCode || e.which
    if (code === 13 /* enter key */) {
      if (!showQuickSearchRes) setShowQuickSearchRes(true)
      if (showQuickSearchRes) {
        if (indexOfHighlightedMovie === NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH) {
          pushToHistory(`/`)
        } else {
          selectedMovieInQuickSearch(suggestions[indexOfHighlightedMovie])
        }
      } 
    }
  }

  // Up and down arrow keys configuration
  // allows using up and down key to select movie in quick search
  ArrowKeysReact.config({
    up: () => {
      isNaN(indexOfHighlightedMovie)
        ? setIndexOfHighlightedMovie(NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH)
        : indexOfHighlightedMovie < 0
          ? setIndexOfHighlightedMovie(NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH)
          : setIndexOfHighlightedMovie(prevState => prevState - 1)
    },
    down: () => {
      isNaN(indexOfHighlightedMovie)
        ? setIndexOfHighlightedMovie(0)
        : indexOfHighlightedMovie > NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH
          ? setIndexOfHighlightedMovie(0)
          : setIndexOfHighlightedMovie(prevState => prevState + 1)
    }
  })


  return [enterKeyInSearchbar]
}