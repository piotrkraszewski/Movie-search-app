import { useContext } from 'react'
import '../../styles/main.scss'
import { AppContext } from '../Contexts/AppContext'

export default function StartPageSearch() {
  const {searchbarText, oldSearchbarText, onSearchbarTextChanging, handleClickOnInput} = useContext(AppContext)

  return (
    <div className='col-lg-6 col-md-8 col-sm-9 col-12 startPageSearchbar'>
      <div className='row'>
        <div className='col-12' >
          <form onSubmit={e => e.preventDefault()}>
            <input
              onChange={onSearchbarTextChanging}
              type='text'
              placeholder='Search Movie Title...'
              value={searchbarText !== '' ? searchbarText : oldSearchbarText}
              onClick={handleClickOnInput}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
