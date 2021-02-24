import { useContext } from 'react'
import { AppContext } from '../../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../../Contexts/MovieSearchbarContext'


export default function GotoOtherRoutesHooks() {
  const { searchbarText, setSearchbarText, oldSearchbarText,  setMovieID, pushToHistory, setAllMoviesData, fetchPopularMoviesOnStartPage} = useContext(AppContext)
  const { setShowQuickSearchRes } = useContext(MovieSearchbarContext)

  function selectedMovieInQuickSearch(item){
    if (searchbarText && item !== undefined) {
      pushToHistory(`/movie/${item[1]}`)
      setSearchbarText(oldSearchbarText)
      setShowQuickSearchRes(false)
      setMovieID(item[1])
    }
  }

  const gotoStarPage = () => {
    setAllMoviesData([])
    setSearchbarText('')
    fetchPopularMoviesOnStartPage()
    pushToHistory(`/`)
  }

  return [selectedMovieInQuickSearch, gotoStarPage]
}