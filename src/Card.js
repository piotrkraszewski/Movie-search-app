import React, {useEffect, useState, useRef} from 'react'
import './styles/main.scss'
import './Card.css'
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
    backdropIMG = 'https://lh3.googleusercontent.com/ZdEaJCCAfkI-PrkHmY0XYFfbdFlgDBFC6jJCLj9hN5THcsKd9GpE0j8pS8HM3z-QCrlkPvUxqxks6yXHO2X4H16YHoMLYcKg7genJH34cWzNiobbZhxQow1tqav6TfXVbrHQ1keP80bVGOgdJt4_UkQMLTq3HqlmJquH5Mvubn7ixo7rno31drUkYIeFgB5mxW4psxvbFvgRTM5CbP8J-GTQ5Ur20j-pBBhU6K2Du4C30G-gPyII7ZAvxzFVTdx_P_VAJLbjrUQ4XIv5PFnbUepa4sQFeJw1Brv4lNtmogTTRZFB2ZuZkP0U_WbFAKgHcgcr8T6WHp1kGG2zyMn3O7x7Qx0vLSNn35Fe2EtyxGg2N8mRuIIoPRC8GYxLxuXZQ1Ol-xls2A9YCVfbF3T7Wb8FG7D7SytqmXl9GEIihcnZNlfOlIKjRs9eOcuOHSIBK5zi0P4ztyJTRE0ztuPDrJ6Cpsfyt4Buofv3VKkysOu_vd936QaWGy1MLLigpOOqv1UWXWq8jbCgkbNEWBbEXAkEyhgda8jDQxy35kTwPFDnPz7Y1-jX1tOweIN498XKBLUZ95QcCG2oiRM2pymRdPVDzij3oydewERzjdnJA4ZhcTsozP6tlWSvOBzZt6uGw-Y-Ve12SE7Q2N07-7YhQ58KbGZTlEjkw9M3YEC6D35dm880Fuz7QY1ZROisPw=w1499-h843-no?authuser=0'
  }
    
  useEffect(() => {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')'
  })
  
  return (
    <TransitionGroup className='helo nomargin'>
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
