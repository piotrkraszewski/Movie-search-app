/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import orderBy from 'lodash/orderBy'
import MoviesList from './MoviesList/MoviesList'
import { WATCHING, PLAN_TO_WATCH, COMPLETED, PAUSED, DROPPED, DELET_MOVIE_DATA } from 'Utils/Consts'

export default function MoviesCollectionLists({userMovies, setUserMovies}) {
  const [displayMode, setDisplayMode] = useState(WATCHING)


  const sort = (e) => {
    console.log('userMovies', userMovies)

    setUserMovies(orderBy(userMovies, 'rating', 'asc'))
  }

   return (
    <div>
      <MoviesList
        listName={displayMode}
        movies={userMovies}/>
    </div>
  )
}