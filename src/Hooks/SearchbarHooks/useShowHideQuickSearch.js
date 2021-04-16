import { useEffect, useContext, useRef } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'

export default function ShowHideQuickSearchHook() {
  const { searchbarText, showResInSearchBar, setShowQuickSearchRes } = useContext(AppContext)
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
    showResInSearchBar(searchbarText)
  }

  return {node, OnSearchBarClicked}
}