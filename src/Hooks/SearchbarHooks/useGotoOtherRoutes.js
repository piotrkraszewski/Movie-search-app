import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { useAppScrollbar } from 'ReusableComponents/AppScroollbar/AppScrollbar'
import { PAGE_TRANSITION_TIME } from 'Utils/Consts'


export default function GotoOtherRoutesHooks() {
  const { searchbarText, pushToHistory, fetchPopularMoviesOnStartPage, setAllMoviesData, setShowQuickSearchRes, setSuggestions} = useContext(AppContext)
  // const { scrollBarRef } = useAppScrollbar()


  function selectedMovieInQuickSearch(id){
    if (searchbarText && id !== undefined) {
      pushToHistory(`/movie/${id}`)
      setShowQuickSearchRes(false)
    }
  }

  function selectedMovieInStartPage(id){
    pushToHistory(`/movie/${id}`)
    // setTimeout(() => {
    //   // moves ScrollBar to top
    //   scrollBarRef.current._ps.element.scrollTop = 0  
    //   // console.log("scrollBarRef", scrollBarRef.current._ps)
      
    //   setSuggestions([])
    // }, PAGE_TRANSITION_TIME * 1000) // exit animation length
  }

  function selectedMovieInProfilePage(id){
    pushToHistory(`/movie/${id}`)
  }

  const gotoStarPage = () => {
    setAllMoviesData([])
    fetchPopularMoviesOnStartPage()
    pushToHistory(`/`)
  }

  return {selectedMovieInQuickSearch, selectedMovieInStartPage, selectedMovieInProfilePage, gotoStarPage}
}