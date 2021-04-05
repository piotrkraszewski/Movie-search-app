import 'styles/main.scss'
import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import Searchbar from 'ReusableComponents/Searchbar/Searchbar'
import useKeysPressedInSearchbar from 'Hooks/SearchbarHooks/useKeysPressedInSearchbar'
import useShowHideQuickSearch from 'Hooks/SearchbarHooks/useShowHideQuickSearch'
import MovieSearchbarResults from './Results/MovieSearchbarResults'


export default function StartPageSearch() {
  const { location } = useContext(AppContext)
  const enterKeyInSearchbar = useKeysPressedInSearchbar()
  const {node, OnSearchBarClicked} = useShowHideQuickSearch()


  return (
    <div className='startPageSearchbar' ref={node}>
      <Searchbar
        onClick={OnSearchBarClicked} 
        onKeyPress={enterKeyInSearchbar}
      />
      {location.pathname.includes('movie') 
      && <MovieSearchbarResults/>}
    </div>
  )
}