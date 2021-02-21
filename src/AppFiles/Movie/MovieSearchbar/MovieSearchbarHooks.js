import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../Contexts/MovieSearchbarContext'

export default function MovieSearchbarHooks() {
  const { searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, suggestions, setMovieID} = useContext(AppContext)
  const { show, setShow } = useContext(MovieSearchbarContext)
  const history = useHistory()


  function selectedMovieInQuickSearch(value){
    if (searchbarText && value !== undefined) {
      setOldSearchbarText(searchbarText)
      setSearchbarText('')
      setMovieID(value[1])
    }
  }
  
  
  function enterKeyPressed(e, sliceNumber, cursor){
    const code = e.keyCode || e.which
    if (code === 13 /* enter key */) {
      // zmienna kursor która œledzi który li jest podœwietlony daje nam indeks za pomoc¹ którego mo¿emy uzyskaæ id filmu z oryginalnej tablicy
      // dodanie pojawienie paska po wcisnieciu enter
      if (show) {
        if (cursor === sliceNumber) {
          history.push(`/`)
        } else {
          selectedMovieInQuickSearch(suggestions[cursor])
          setShow(false)
          setSearchbarText(oldSearchbarText)
        }
      } else {
        if (cursor === sliceNumber) {
          history.push(`/`)
        } else {
          setSearchbarText(oldSearchbarText)
          setOldSearchbarText('')
        }
        setShow(true)
      }
    }
  }

  return [selectedMovieInQuickSearch, enterKeyPressed]
}