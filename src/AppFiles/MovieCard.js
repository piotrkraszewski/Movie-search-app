import { useEffect, useContext } from 'react'
import '../styles/main.scss'
import numeral from 'numeral'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { AppContext } from './AppContext'
import no_image from '../images/no_image.png'


function nestedDataToString(nestedData) {
  let nestedArray = [],
      resultString
  if (nestedData !== undefined) {
    nestedData.forEach(item => {
      nestedArray.push(item.name)
    })
  }
  resultString = nestedArray.join(', ') // array to string
  return resultString
}

export default function Card() {
  const {movieData, backgroundIMG, setBackgroundIMG} = useContext(AppContext)
  const {original_title, overview, tagline, poster_path, production_companies, genres, backdrop_path, release_date, runtime } = movieData
  let {revenue, vote_average} = movieData

  const posterIMG = `https://image.tmdb.org/t/p/w500${poster_path}`,
        productionList = nestedDataToString(production_companies),
        genresList = nestedDataToString(genres),
        backdropIMG = `https://image.tmdb.org/t/p/original${backdrop_path}`

  // conditional statements for no data
  if (vote_average === 'undefined' || vote_average === 0) {
    vote_average = '-'
  }

  // dodaje $ i przecinki
  if (revenue === 'undefined' || revenue === 0)
    revenue = '-'
  else
    revenue = numeral(revenue).format('($0,0)')

// add changing background logic !!!
    
  useEffect(() => {
    setBackgroundIMG(backdropIMG)
  })

  return (
    <TransitionGroup className='MovieCard'>
    <CSSTransition 
      key={original_title}
      timeout={1500}
      classNames='fadeMovieCard'
      >
    <div className='col-12 Card nopadding row'> 

      <div className='meta-data-container col-12 col-md-7 col-lg-8'>
        <h1>{original_title}</h1>
        <span className="tagline">{tagline}</span>
        <p>{overview}</p>
        <div className="additional-details">
          <span className="genre-list">{genresList}</span>
          <span className="production-list">{productionList}</span>
          <div className="row nopadding release-details">
            <div className="col-6"> Original Release: <span className="meta-data">{release_date}</span></div>
            <div className="col-6"> Running Time: <span className="meta-data">{runtime} min</span> </div>
            <div className="col-6"> Box Office: <span className="meta-data">{revenue}</span></div>
            <div className="col-6"> Vote Average: <span className="meta-data">{vote_average}</span></div>
          </div>
        </div> 
      </div>

      <div className="poster-container nopadding order-md-first col-12 col-md-5 col-lg-4">
        <img id="postertest" className='poster' 
        src={poster_path !== 'null' ? posterIMG : no_image}/>
      </div>
    </div>
  </CSSTransition>
  </TransitionGroup>
  )
}
