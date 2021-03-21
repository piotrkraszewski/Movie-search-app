import { useContext } from 'react'
import { AppContext } from '../../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../../Contexts/MovieSearchbarContext'


export default function GotoOtherRoutesHooks() {
  const { searchbarText, setSearchbarText, oldSearchbarText, pushToHistory, setAllMoviesData} = useContext(AppContext)
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
    pushToHistory(`/`)
  }

  return {selectedMovieInQuickSearch, gotoStarPage}
}