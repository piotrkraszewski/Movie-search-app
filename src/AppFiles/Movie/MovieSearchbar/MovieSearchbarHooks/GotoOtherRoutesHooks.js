import { useContext } from 'react'
import { AppContext } from '../../../Contexts/AppContext'


export default function GotoOtherRoutesHooks() {
  const { searchbarText, setSearchbarText, setOldSearchbarText, setMovieID, pushToHistory, setAllMoviesData, fetchPopularMoviesOnStartPage} = useContext(AppContext)

  function selectedMovieInQuickSearch(item){
    if (searchbarText && item !== undefined) {
      pushToHistory(`/movie/${item[1]}`)
      setOldSearchbarText(searchbarText)
      setSearchbarText('')
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