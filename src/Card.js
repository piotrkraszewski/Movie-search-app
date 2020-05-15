import React, {useEffect, useState, useRef} from 'react'
import './styles/main.scss'
import numeral from 'numeral'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function nestedDataToString(nestedData) {
  let nestedArray = [],
      resultString;
  if(nestedData !== undefined){
    nestedData.forEach(function(item){
      nestedArray.push(item.name);
    });
  }
  resultString = nestedArray.join(', '); // array to string
  return resultString;
}

export default function Card(props) {
let data = props.data

let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster_path,
    production = data.production_companies,
    productionCountries = data.production_countries,
    genres = data.genres,
    totalRevenue = data.revenue,
    productionList = nestedDataToString(production),
    productionCountriesList = nestedDataToString(productionCountries),
    noData = '-',
    genresList = nestedDataToString(genres),
    backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop_path


  // conditional statements for no data
  if (data.vote_average === 'undefined' || data.vote_average === 0) {
    data.vote_average = noData
  }

  // dodaje $ i przecinki
  if (totalRevenue === 'undefined' || totalRevenue === 0) {
    totalRevenue = noData
  } else {
    totalRevenue = numeral(data.revenue).format('($0,0)');
  }

  if(data.poster_path== null){
    posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g'
  }

  if(data.backdrop_path == null){
    backdropIMG = 'https://wallpaperaccess.com/full/670449.jpg'
  }

  useEffect(() => {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')'
  })

  return (
    <TransitionGroup className='TransitionGroup'>
    <CSSTransition 
      key={props.movieID}
      timeout={2000}
      classNames='fade'
      >
    <div className='col-12 cardcont nopadding row'>

      <div className='meta-data-container col-12 col-md-7 col-lg-8'>
        <h1>{data.original_title}</h1>
        <span className="tagline">{data.tagline}</span>
        <p>{data.overview}</p>
        <div className="additional-details">
          <span className="genre-list">{genresList}</span>
          <span className="production-list">{productionList}</span>
          <div className="row nopadding release-details">
            <div className="col-6"> Original Release: <span className="meta-data">{data.release_date}</span></div>
            <div className="col-6"> Running Time: <span className="meta-data">{data.runtime} min</span> </div>
            <div className="col-6"> Box Office: <span className="meta-data">{totalRevenue}</span></div>
            <div className="col-6"> Vote Average: <span className="meta-data">{data.vote_average}</span></div>
          </div>
        </div> 
      </div>

      <div className="poster-container nopadding order-md-first col-12 col-md-5 col-lg-4">
        <img id="postertest" className='poster' src={posterIMG}/>
      </div>
    </div>
  </CSSTransition>
  </TransitionGroup>
  )
}
