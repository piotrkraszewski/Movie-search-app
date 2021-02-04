import { useEffect, useContext } from 'react'
import './styles/main.scss'
import numeral from 'numeral'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {AppContext} from './AppContext'
import no_image from './images/no_image.png'


function nestedDataToString(nestedData) {
  let nestedArray = [],
    resultString
  if (nestedData !== undefined) {
    nestedData.forEach(function (item) {
      nestedArray.push(item.name)
    })
  }
  resultString = nestedArray.join(', ') // array to string
  return resultString
}

export default function Card() {
  const {movieData} = useContext(AppContext)

  let posterIMG = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path,
      production = movieData.production_companies,
      genres = movieData.genres,
      totalRevenue = movieData.revenue,
      productionList = nestedDataToString(production),
      noData = '-',
      genresList = nestedDataToString(genres),
      backdropIMG = 'https://image.tmdb.org/t/p/original' + movieData.backdrop_path

  // conditional statements for no data
  if (movieData.vote_average === 'undefined' || movieData.vote_average === 0) {
    movieData.vote_average = noData
  }

  // dodaje $ i przecinki
  if (totalRevenue === 'undefined' || totalRevenue === 0)
    totalRevenue = noData
  else
    totalRevenue = numeral(movieData.revenue).format('($0,0)')


  if (movieData.backdrop_path == null)
    backdropIMG = 'https://wallpaperaccess.com/full/670449.jpg'

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backdropIMG})`
  })

  return (
    <TransitionGroup className='TransitionGroup'>
    <CSSTransition 
      key={movieData}
      timeout={2000}
      classNames='fadeMovieCard'
      >
    <div className='col-12 cardcont nopadding row'>

      <div className='meta-data-container col-12 col-md-7 col-lg-8'>
        <h1>{movieData.original_title}</h1>
        <span className="tagline">{movieData.tagline}</span>
        <p>{movieData.overview}</p>
        <div className="additional-details">
          <span className="genre-list">{genresList}</span>
          <span className="production-list">{productionList}</span>
          <div className="row nopadding release-details">
            <div className="col-6"> Original Release: <span className="meta-data">{movieData.release_date}</span></div>
            <div className="col-6"> Running Time: <span className="meta-data">{movieData.runtime} min</span> </div>
            <div className="col-6"> Box Office: <span className="meta-data">{totalRevenue}</span></div>
            <div className="col-6"> Vote Average: <span className="meta-data">{movieData.vote_average}</span></div>
          </div>
        </div> 
      </div>

      <div className="poster-container nopadding order-md-first col-12 col-md-5 col-lg-4">
        <img id="postertest" className='poster' 
        src={movieData.poster_path !== 'null' ? posterIMG : no_image}/>
      </div>
    </div>
  </CSSTransition>
  </TransitionGroup>
  )
}
