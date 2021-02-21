import { useContext } from 'react'
import '../styles/main.scss'
import { Link } from 'react-router-dom'
import { AppContext } from './Contexts/AppContext'
import { NOT_FOUND_POSTER_W500 } from '../utilities/Consts'
import no_image from '../images/no_image.png'


export default function FullscreenSearch() {
  const {searchbarText, suggestions, setMovieID} = useContext(AppContext)

  const suggestionsSelectedFullscreen = value => {
    setMovieID(value[1])
  }

  return (
    <div className='StartPageCardTransition'>

    <div className='StartPageCard'>
      <p className='Popular'>{searchbarText === '' || searchbarText === null ? 'Trending Now' : ''}</p>
      <div className='row'>
        {suggestions.map((item, index) => 
          <div className='cardContainer col-xl-2 col-md-3 col-4' key={index}>
            <Link to={`/movie/${item[1]}`} className='linkStyle'>
              <div className='cardFS' onClick={() => suggestionsSelectedFullscreen(item)}>
                <img 
                  className='posterImage' 
                  src={item[2] !== NOT_FOUND_POSTER_W500 ? item[2] : no_image}
                  alt='movie poster'
                />
                <h1 className='FS-title'>{item[0]}</h1>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>

  </div>
  )
}