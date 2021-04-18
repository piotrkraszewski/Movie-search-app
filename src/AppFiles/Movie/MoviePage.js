// import { useContext } from 'react'
import './MoviePage.scss'
import { motion, AnimatePresence } from 'framer-motion'
// import { AppContext } from 'AppFiles/Contexts/AppContext'
import { useMovieContext } from 'AppFiles/Contexts/MovieContext'
import { POSTER_W500 } from 'Utils/Consts'
import { nestedDataToString } from './MoviePageFunctions'
import { PAGE_TRANSITION_TIME } from 'Utils/Consts'
import no_image from 'Images/no_image.png'

export default function MovieCard () {
  const { movieData } = useMovieContext()
  const { original_title, overview, tagline, poster_path, production_companies, genres, release_date, runtime } = movieData
  let { revenue, vote_average } = movieData

  const productionList = nestedDataToString(production_companies),
        genresList = nestedDataToString(genres)


  return (
    /* Transition between this and other pages */
    <motion.div 
      className='MovieCard'

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay :0.2}}
      exit={{ opacity: 0 }}
      transition={{ duration: PAGE_TRANSITION_TIME }}
    >   
      {/* Transition between cards when we pick another movie on this page */}
      <AnimatePresence exitBeforeEnter> 
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: PAGE_TRANSITION_TIME }}
          className='Container row'
          key={original_title}
        >
          <div className='metaDataContainer col-12 col-md-7 col-lg-8'>
            <h1>{original_title}</h1>
            <span className='tagline'>{tagline}</span>
            <p>{overview}</p>
            <div className='additionalDetails'>
              <span className='genreList'>{genresList}</span>
              <span className='productionList'>{productionList}</span>
              <div className='row releaseDetails'>

                <div className='col-6'>
                  Original Release:
                  <span className='metaData'>{release_date}</span>
                </div>
                <div className='col-6'>
                  Running Time: 
                  <span className='metaData'>
                    {runtime} min
                  </span>
                </div>
                <div className='col-6'>
                  Box Office: 
                  <span className='metaData'>
                    {revenue ? `${parseInt(revenue).toLocaleString()} $` : '-'}
                  </span>
                </div>
                <div className='col-6'>
                  Vote Average:
                  <span className='metaData'>
                    {vote_average ? vote_average : '-'}
                  </span>
                </div>

              </div>
            </div>
          </div>

          <div 
          className='posterContainer order-md-first col-12 col-md-5 col-lg-4'>
            <img
              className='poster'
              src={poster_path !== null 
                ? POSTER_W500 + poster_path 
                : no_image}
              alt='poster'
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
