import 'styles/main.scss'
import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import Searchbar from 'ReusableComponents/Searchbar/Searchbar'
import useKeysPressedInSearchbar from 'Hooks/SearchbarHooks/useKeysPressedInSearchbar'
import useShowHideQuickSearch from 'Hooks/SearchbarHooks/useShowHideQuickSearch'
import SearchbarResults from './Results/SearchbarResults'


export default function NavSearchbar() {
  const { location } = useContext(AppContext)
  const enterKeyInSearchbar = useKeysPressedInSearchbar()
  const {node, OnSearchBarClicked} = useShowHideQuickSearch()


  return (
    <div className='NavSearchbar' ref={node}>
      <Searchbar
        onClick={OnSearchBarClicked} 
        onKeyPress={enterKeyInSearchbar}
      />
      {location.pathname.includes('movie') 
      && <SearchbarResults/>}
    </div>
  )
}