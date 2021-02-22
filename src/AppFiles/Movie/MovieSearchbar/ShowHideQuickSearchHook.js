import { AppContext } from '../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../Contexts/MovieSearchbarContext'
import { useEffect, useContext, useRef } from 'react'

export default function ShowHideQuickSearchHook() {
  const { searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, showResInSearchBar } = useContext(AppContext)
  const { setShow } = useContext(MovieSearchbarContext)
  const node = useRef()

  function hideOnOutsideClick(e) {
    if (!node.current.contains(e.target)){
      setShow(false) 
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', hideOnOutsideClick)
    return () => {
      // return function to be called when unmounted
      document.removeEventListener('mousedown', hideOnOutsideClick)
    }
  }, [])

  const OnMovieSearchBarClicked = async e => {
    setShow(true)
    if (searchbarText === '') {
      showResInSearchBar(oldSearchbarText)
      setSearchbarText(oldSearchbarText)
      setOldSearchbarText('')
    }
  }

  return [node, OnMovieSearchBarClicked]
}