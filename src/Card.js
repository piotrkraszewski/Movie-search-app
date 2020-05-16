import React, {useEffect, useState, useRef} from 'react'
import './styles/main.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'



export default function Card(props) {
let {data, genresList, productionList, totalRevenue, posterIMG} = props



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
