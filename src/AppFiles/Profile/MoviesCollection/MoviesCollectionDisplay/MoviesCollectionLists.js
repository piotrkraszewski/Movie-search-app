/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import s from './MoviesCollectionLists.module.scss'
import orderBy from 'lodash/orderBy'
import MoviesList from './MoviesList/MoviesList'
import DropdownList from "react-widgets/DropdownList"
import { WATCHING, PLAN_TO_WATCH, COMPLETED, PAUSED, DROPPED } from 'Utils/Consts'

export default function MoviesCollectionLists({userMovies, setUserMovies}) {
  const [displayMode, setDisplayMode] = useState(WATCHING)
  const [sortMode, setSortMode] = useState('Score')


  const sort = (e) => {
    console.log('userMovies', userMovies)

    setUserMovies(orderBy(userMovies, 'rating', 'asc'))
  }

   return (
    <div>
      <div className={s.MovieStatusWidgets}>
        <div className={s.Widget}>
          <p>Lists</p>
          <DropdownList
            filter={false}  // prevents from writing in box
            value={displayMode}
            onChange={nextValue => setDisplayMode(nextValue)}
            textField="color"
            data={[WATCHING, PLAN_TO_WATCH, COMPLETED, PAUSED, DROPPED]}
          />
        </div>
        <div className={s.Widget}>
          <p>Sort</p>
          <DropdownList
            filter={false}  // prevents from writing in box
            value={sortMode}
            onChange={nextValue => setSortMode(nextValue)}
            textField="color"
            data={['Score']}
          />
        </div>
      </div>
      <MoviesList
        listName={displayMode}
        movies={userMovies}/>
    </div>
  )
}