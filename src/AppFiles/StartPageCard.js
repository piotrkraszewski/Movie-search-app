import { useContext } from 'react'
import '../styles/main.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom'
import { AppContext } from './AppContext'
import no_image from '../images/no_image.png'


export default function FullscreenSearch() {
  const {searchbarText, suggestions, setMovieID} = useContext(AppContext)

  const suggestionsSelectedFullscreen = value => {
    setMovieID(value[1])
  }

  return (
    <TransitionGroup className='TransitionGroup'>
    <CSSTransition 
      // key={suggestions}
      timeout={1500}
      classNames='fadeStartPage'
    >
    <div>
      <p className='Popular'>{searchbarText === '' || searchbarText === null ? 'Trending Now' : ''}</p>
      <div className='row startPage'>
        {suggestions.map((item, index) => 
          <div className='cardContainer col-xl-2 col-md-3 col-4' key={index}>
            <Link to={`/movie/${item[1]}`} className='linkStyle'>
              <div className='cardFS' onClick={() => suggestionsSelectedFullscreen(item)}>
                <img className='posterImage' src={item[2] !== 'https://image.tmdb.org/t/p/w500null' ? item[2] : no_image}/>
                <h1 className='FS-title'>{item[0]}</h1>
              </div>
            </Link>
        </div>
        )}
      </div>
    </div>
  </CSSTransition>
  </TransitionGroup>
  )
}