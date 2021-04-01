import { useEffect, useContext, useRef } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'

export default function ShowHideQuickSearchHook() {
  const { searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, showResInSearchBar } = useContext(AppContext)
  const { setShowQuickSearchRes } = useContext(MovieSearchbarContext)
  const node = useRef()

  function hideOnOutsideClick(e) {
    if (!node.current.contains(e.target)){
      setShowQuickSearchRes(false) 
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', hideOnOutsideClick)
    return () => {
      // cleanup function - called when unmounted
      document.removeEventListener('mousedown', hideOnOutsideClick)
    }
  }, [])

  const OnSearchBarClicked = async e => {
    setShowQuickSearchRes(true)
    if (searchbarText === '') {
      showResInSearchBar(oldSearchbarText)
      setSearchbarText(oldSearchbarText)
      setOldSearchbarText('')
    }
  }

  return {node, OnSearchBarClicked}
}