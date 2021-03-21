import { useContext } from 'react'
import { AppContext } from '../../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../../Contexts/MovieSearchbarContext'


export default function GotoOtherRoutesHooks() {
  const { searchbarText, setSearchbarText, oldSearchbarText,  setMovieID, pushToHistory, setAllMoviesData, fetchPopularMoviesOnStartPage} = useContext(AppContext)
  const { setShowQuickSearchRes } = useContext(MovieSearchbarContext)

  function selectedMovieInQuickSearch(id){
    if (searchbarText && id !== undefined) {
      pushToHistory(`/movie/${id}`)
      setSearchbarText(oldSearchbarText)
      setShowQuickSearchRes(false)
      setMovieID(id)
    }
  }

  const gotoStarPage = () => {
    setAllMoviesData([])
    setSearchbarText('')
    // fetchPopularMoviesOnStartPage()
    pushToHistory(`/`)
  }

  return {selectedMovieInQuickSearch, gotoStarPage}
}