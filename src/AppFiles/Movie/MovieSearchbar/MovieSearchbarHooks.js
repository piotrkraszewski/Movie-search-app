import { useContext } from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import { AppContext } from '../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../Contexts/MovieSearchbarContext'
import { NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH } from '../../../utilities/Consts'

export default function MovieSearchbarHooks() {
  const { searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, suggestions, setMovieID, pushToHistory} = useContext(AppContext)
  const { showQuickSearchRes, setShowQuickSearchRes, cursor, setCursor } = useContext(MovieSearchbarContext)

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
      if (cursor === NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH) {
        pushToHistory(`/`)
        setSearchbarText(oldSearchbarText)
        
        if (showQuickSearchRes) {
          selectedMovieInQuickSearch(suggestions[cursor])
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
      isNaN(cursor)
        ? setCursor(NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH)
        : cursor < 0
          ? setCursor(NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH)
          : setCursor(prevState => prevState - 1)
    },
    down: () => {
      isNaN(cursor)
        ? setCursor(0)
        : cursor > NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH
          ? setCursor(0)
          : setCursor(prevState => prevState + 1)
    }
  })


  return [selectedMovieInQuickSearch, enterKeyPressedInQuickSearch]
}