import { useContext } from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import { AppContext } from '../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../Contexts/MovieSearchbarContext'
import { NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH } from '../../../utilities/Consts'

export default function MovieSearchbarHooks() {
  const { searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, suggestions, setMovieID, pushToHistory} = useContext(AppContext)
  const { showQuickSearchRes, setShowQuickSearchRes, indexOfHighlightedMovie, setIndexOfHighlightedMovie } = useContext(MovieSearchbarContext)

  function selectedMovieInQuickSearch(item){
    if (searchbarText && item !== undefined) {
      pushToHistory(`/movie/${item[1]}`)
      setOldSearchbarText(searchbarText)
      setSearchbarText('')
      setMovieID(item[1])
    }
  }
  
  
  function enterKeyPressedInQuickSearch(e){
    const code = e.keyCode || e.which
    if (code === 13 /* enter key */) {
      if (indexOfHighlightedMovie === NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH) {
        pushToHistory(`/`)
        setSearchbarText(oldSearchbarText)

        if (showQuickSearchRes) {
          selectedMovieInQuickSearch(suggestions[indexOfHighlightedMovie])
          setShowQuickSearchRes(false)
        } else {
          // opens quick search suggestions after pressing enter
          setShowQuickSearchRes(true)
          setOldSearchbarText('')
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


  return [selectedMovieInQuickSearch, enterKeyPressedInQuickSearch]
}