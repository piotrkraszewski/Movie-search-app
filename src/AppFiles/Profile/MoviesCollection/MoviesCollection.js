/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import s from './MoviesCollection.module.sass'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import ProfilePosterCard from '../ProfilePosterCard/ProfilePosterCard'
import { POSTER_W500, START_PAGE_CARDS_TRANSITION } from 'Utils/Consts'
import useGotoOtherRoutes from 'Hooks/SearchbarHooks/useGotoOtherRoutes'
import {getMovieData} from 'Utils/FetchFunctions'


export default function MoviesCollection() {
  const history = useHistory()
  const { userData } = useAuth()
  // const [loading, setLoading] = useState(true)
  const {selectedMovieInProfilePage} = useGotoOtherRoutes() 
  const [userMovies, setUserMovies] = useState([])


  useEffect(async() => {
    async function initUserMovies(){
      // transforms object of objects form firebase to array of objects
      const moviesArrFromFirebase = Object.entries(userData.movies) // create array of arrays
      let newArrToDisp = []
  
      for (const [id, movie] of moviesArrFromFirebase) {
        const tmdb = await getMovieData(id) // request movieData form tmdb to get poster
        console.log(tmdb)
  
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

    setUserMovies(await initUserMovies())
  }, [])



return (
  <div className={s.MoviesCollection}>
    <h2>Movie List</h2>
    <div className='row'>
      { userMovies.length > 0 && userMovies.map(cardData => (

      <ProfilePosterCard 
        className='col-xl-2 col-md-3 col-sm-4 col-6'
        cardData={cardData} 
        onClick={selectedMovieInProfilePage}
        cardTransitionDuration={START_PAGE_CARDS_TRANSITION}
        imgTransition={0.5}
        imgHeight={'750'}
        imgWidth={'500'}
      />
        // <div>
        //   <p>{item.id}</p>
        //   <p>{item.status}</p>
        //   <p>{item.rating}</p>
        //   <img src={item.poster} alt=""/>
        // </div>
      ))}
    </div>
  </div>
)
}