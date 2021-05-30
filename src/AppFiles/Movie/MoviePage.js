import s from './MoviePage.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useMovieContext } from 'AppFiles/Contexts/MovieContext'
import { POSTER_W500 } from 'Utils/Consts'
import { nestedDataToString } from './MoviePageFunctions'
import { PAGE_TRANSITION_TIME } from 'Utils/Consts'
import no_image from 'Images/no_image.png'
import MovieStatusWidget from './MovieStatusWidget'
import { useAuth } from 'AppFiles/Contexts/AuthContext'


export default function MovieCard () {
  const { user, userData } = useAuth()
  const { movieData } = useMovieContext()
  const { original_title, overview, tagline, poster_path, production_companies, genres, release_date, runtime } = movieData
  let { revenue, vote_average } = movieData

  const productionList = nestedDataToString(production_companies)
  const genresList = nestedDataToString(genres)


  return (
    /* Transition between this and other pages */
    <motion.div
      className={s.MovieCard}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay :0.2}}
      exit={{ opacity: 0 }}
      transition={{ duration: PAGE_TRANSITION_TIME }}
    >
      {/* Transition between cards when we pick another movie on this page */}
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className={s.Container}
          key={original_title}

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: PAGE_TRANSITION_TIME }}
        >
          <div className={s.metaDataContainer + ' col-12 col-md-7 col-lg-8'}>
            <h1>{original_title}</h1>

            {userData.movies && <MovieStatusWidget/>}

            <span className={s.tagline}>{tagline}</span>
            <p>{overview}</p>
            <div className={s.additionalDetails}>
              <span className={s.genreList}>{genresList}</span>
              <span className={s.productionList}>{productionList}</span>


              <div className={s.releaseDetails}>
                <div >
                  Original Release:
                  <span>{release_date}</span>
                </div>
                <div>
                  Running Time:
                  <span>{runtime} min</span>
                </div>
                <div>
                  Box Office:
                  <span>{revenue ? `${parseInt(revenue).toLocaleString()} $` : '-'}</span>
                </div>
                <div>
                  Vote Average:
                  <span>{vote_average ? vote_average : '-'}</span>
                </div>
              </div>


            </div>
          </div>

          <div
          className={s.posterContainer + ' order-md-first col-12 col-md-5 col-lg-4'}>
            <img
              className={s.poster}
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
