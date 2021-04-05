import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'


export default function GotoOtherRoutesHooks() {
  const { searchbarText, setSearchbarText, oldSearchbarText, pushToHistory, fetchPopularMoviesOnStartPage, setAllMoviesData, setShowQuickSearchRes} = useContext(AppContext)

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