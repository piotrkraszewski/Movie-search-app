import {useEffect, useState} from 'react'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import MoviesCollectionDisp from './MoviesCollectionDisplay/MCLists'
import MoviesCollectionEmpty from './MoviesCollectionDisplay/MCEmpty'
import { POSTER_W500 } from 'Utils/Consts'
import {getMovieData} from 'Utils/FetchFunctions'
import { motion, AnimatePresence } from "framer-motion"


export default function MoviesCollection() {
  const { userData } = useAuth()
  const [loading, setLoading] = useState(true)
  const [userMovies, setUserMovies] = useState()


  useEffect(async() => {
    async function initUserMovies(){
      // transforms object of objects form firebase to array of objects
      const moviesArrFromFirebase = Object.entries(userData.movies) // create array of arrays
      let newArrToDisp = []

      for (const [id, movie] of moviesArrFromFirebase) {
        const tmdb = await getMovieData(id) // request movieData form tmdb to get poster

        newArrToDisp.push({
          id: id,
          status: movie.status,
          rating: movie.rating,
          title: tmdb.title,
          poster: tmdb.poster_path !== null ? POSTER_W500 + tmdb.poster_path : null
        })
      }

      return newArrToDisp // return array of objects
    }


    userData.movies && setUserMovies(await initUserMovies())
  }, [])


  useEffect(() => {
    //neccesary because userMovies first update with promise and then array
    if(Array.isArray(userMovies) || !userData.movies){
      setLoading(false)
    }
  }, [userMovies])

  return (
    <>
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {!loading &&
        (userMovies && userMovies.length > 0
          ? <MoviesCollectionDisp
            userMovies={userMovies}
            setUserMovies={setUserMovies}/>
          : <MoviesCollectionEmpty/>)}
      </motion.div>
    </AnimatePresence>
    </>
  )
}