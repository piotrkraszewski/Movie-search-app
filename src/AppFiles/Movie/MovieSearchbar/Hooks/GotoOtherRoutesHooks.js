import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'


export default function GotoOtherRoutesHooks() {
  const { searchbarText, setSearchbarText, oldSearchbarText, pushToHistory, fetchPopularMoviesOnStartPage, setAllMoviesData} = useContext(AppContext)
  const { setShowQuickSearchRes } = useContext(MovieSearchbarContext)

  function selectedMovieInQuickSearch(id){
    if (searchbarText && id !== undefined) {
      pushToHistory(`/movie/${id}`)
      setSearchbarText(oldSearchbarText)
      setShowQuickSearchRes(false)
    }
  }

  const gotoStarPage = () => {
    setAllMoviesData([])
    fetchPopularMoviesOnStartPage()
    pushToHistory(`/`)
  }

  return {selectedMovieInQuickSearch, gotoStarPage}
}