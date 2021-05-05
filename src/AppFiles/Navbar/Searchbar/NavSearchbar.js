import './NavSearchbar.scss'
import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { DebounceInput } from 'react-debounce-input';
import closeImg  from 'Images/close.svg'
import useKeysPressedInSearchbar from 'Hooks/SearchbarHooks/useKeysPressedInSearchbar'
import useShowHideQuickSearch from 'Hooks/SearchbarHooks/useShowHideQuickSearch'
import SearchbarResults from './Results/SearchbarResults'


export default function NavSearchbar() {
  const { location, searchbarText, setSearchbarText, onSearchbarTextChanging, suggestions } = useContext(AppContext)
  const enterKeyInSearchbar = useKeysPressedInSearchbar()
  const {node, OnSearchBarClicked} = useShowHideQuickSearch()

  const resetSearch = () => setSearchbarText('')
  
  console.log(location.pathname)

  return (
    <div className='NavSearchbar' ref={node}>
      <form onSubmit={e => e.preventDefault()}>
        <DebounceInput
          debounceTimeout={250}
          onChange={onSearchbarTextChanging}
          type='text'
          placeholder='Search Movie'
          value={searchbarText}
          onClick={OnSearchBarClicked}
          onKeyPress={enterKeyInSearchbar}
        />
        <img 
          src={closeImg} 
          onClick={resetSearch}
          alt="close search"
        />
      </form>

      {(location.pathname !=='/' || suggestions.length === 0)
      && <SearchbarResults />}
    </div>
  )
}