import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'

export default function Searchbar(props) {
  const {searchbarText, oldSearchbarText, onSearchbarTextChanging} = useContext(AppContext)

  const {onClick, onKeyPress} = props

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        onChange={onSearchbarTextChanging}
        type='text'
        placeholder='Search Movie Title...'
        value={searchbarText !== '' ? searchbarText : oldSearchbarText}
        onKeyPress={onKeyPress}
        onClick={onClick}
      />
    </form>
  )
}