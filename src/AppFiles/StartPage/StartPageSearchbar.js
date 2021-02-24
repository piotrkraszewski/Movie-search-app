import { useContext } from 'react'
import '../../styles/main.scss'
// import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { AppContext } from '../Contexts/AppContext'

export default function StartPageSearch() {
  const {searchbarText, oldSearchbarText, onSearchbarTextChanging, handleClickOnInput} = useContext(AppContext)

  // const [changeStyle, setChangeStyle] = useState(false)
  // useScrollPosition(({ prevPos, currPos }) => {
  //   (currPos.y < -20) ? setChangeStyle(true) : setChangeStyle(false)    // is it implelented i scss?
  //   console.log(changeStyle)
  // })

  return (
    <div className='col-lg-6 col-md-8 col-sm-9 col-12 st-search st-animation'>
      <div className='row'>
        <div className='col-12' >
          <form onSubmit={e => { e.preventDefault()}}>
            <input
              onChange={onSearchbarTextChanging}
              className='myForm1 myForm-animation'
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
