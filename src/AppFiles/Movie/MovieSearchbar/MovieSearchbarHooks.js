import { useContext } from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import { AppContext } from '../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../Contexts/MovieSearchbarContext'
import { NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH } from '../../../utilities/Consts'

export default function MovieSearchbarHooks() {
  const { searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, suggestions, setMovieID, pushToHistory} = useContext(AppContext)
  const { show, setShow, cursor, setCursor } = useContext(MovieSearchbarContext)

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
      // zmienna kursor która œledzi który li jest podœwietlony daje nam indeks za pomoc¹ którego mo¿emy uzyskaæ id filmu z oryginalnej tablicy
      // dodanie pojawienie paska po wcisnieciu enter
      if (show) {
        if (cursor === NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH) {
          pushToHistory(`/`)
        } else {
          selectedMovieInQuickSearch(suggestions[cursor])
          setShow(false)
          setSearchbarText(oldSearchbarText)
        }
      } else {
        if (cursor === NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH) {
          pushToHistory(`/`)
        } else {
          setSearchbarText(oldSearchbarText)
          setOldSearchbarText('')
        }
        setShow(true)
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