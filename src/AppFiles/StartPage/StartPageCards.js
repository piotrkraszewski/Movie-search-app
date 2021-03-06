import { useContext } from 'react'
import '../../styles/main.scss'
import { Link } from 'react-router-dom'
import { AppContext } from '../Contexts/AppContext'
import { NOT_FOUND_POSTER_W500 } from '../../utilities/Consts'
import no_image from '../../images/no_image.png'


export default function FullscreenSearch() {
  const {searchbarText, suggestions, setMovieID} = useContext(AppContext)

  return (
    <div className='StartPageCards'>

    <div className='Container'>
      <p className='title'>
        {!searchbarText && 'Trending Now'}
      </p>
      <div className='row'>

        {suggestions.map((item, index) => 
          <div 
            className='smallCard col-xl-2 col-md-3 col-4' 
            key={index}
          >
            <Link to={`/movie/${item[1]}`} className='linkStyle'>
              <div onClick={() => setMovieID(item[1])}>
                <img 
                  src={item[2] !== NOT_FOUND_POSTER_W500 
                    ? item[2] 
                    : no_image}
                  alt={`poster ${index}`}
                />
                <p>{item[0]}</p>
              </div>
            </Link>
          </div>
        )}
        
      </div>
    </div>

  </div>
  )
}