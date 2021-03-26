import { useContext } from 'react'
import 'styles/main.scss'
import { Link } from 'react-router-dom'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import no_image from 'images/no_image.png'


export default function FullscreenSearch() {
  const {searchbarText, suggestions} = useContext(AppContext)

  return (
    <div className='StartPageCards'>

    <div className='Container'>
      <p className='title'>
        {!searchbarText && 'Trending Now'}
      </p>
      <div className='row'>

        {suggestions.map((item) => 
          <div 
            className='smallCard col-xl-2 col-md-3 col-4' 
            key={item.id}
          >
            <Link to={`/movie/${item.id}`} className='linkStyle'>
              <div>
                <img 
                  src={item.poster ? item.poster : no_image}
                  alt={`poster ${item.id}`}
                />
                <p>{item.title}</p>
              </div>
            </Link>
          </div>
        )}
        
      </div>
    </div>

  </div>
  )
}