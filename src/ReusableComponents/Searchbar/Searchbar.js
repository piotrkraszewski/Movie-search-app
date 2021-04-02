import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import closeImg  from 'Images/close.svg'
import {DebounceInput} from 'react-debounce-input';

export default function Searchbar(props) {
  const {searchbarText, setSearchbarText, setOldSearchbarText,  oldSearchbarText, onSearchbarTextChanging} = useContext(AppContext)

  const {onClick, onKeyPress} = props

  function resetSearch() {
    setSearchbarText('')
    setOldSearchbarText('')
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <DebounceInput
        debounceTimeout={250}
        onChange={onSearchbarTextChanging}
        type='text'
        placeholder='Search Movie'
        value={searchbarText !== '' ? searchbarText : oldSearchbarText}
        onKeyPress={onKeyPress}
        onClick={onClick}
      />
      <img 
        src={closeImg} 
        onClick={resetSearch}
        alt="close search"
      />
    </form>
  )
}