/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import s from './MoviesCollectionLists.module.scss'
import orderBy from 'lodash/orderBy'
import MoviesList from './MoviesList/MoviesList'
import { WATCHING, STATUS_OPTIONS, RATING, ASC, DESC } from 'Utils/Consts'
import DropdownListTemplate from 'ReusableComponents/DropdownListTemplate'

export default function MoviesCollectionLists({userMovies, setUserMovies}) {
  const [status, setStatus] = useState(WATCHING)
  const [sortBy, setSortBy] = useState(RATING)
  const [order, setOrder] = useState(DESC)

  useEffect(() => {
    console.log('userMovies', userMovies)
    setUserMovies(orderBy(userMovies, RATING, DESC))
  }, [sortBy])

  useEffect(() => {
    setUserMovies(orderBy(userMovies, sortBy, order))
  }, [order])


  return (
    <div>
      <div className={s.MovieStatusWidgets}>
        <DropdownListTemplate
          className={s.Widget}
          label={'Status'}
          value={status}
          onChangeFunc={value => setStatus(value)}
          data={STATUS_OPTIONS}
        />
        <DropdownListTemplate
          className={s.Widget}
          label={'Sort by'}
          value={sortBy}
          onChangeFunc={value => setSortBy(value)}
          data={['rating', 'Title']}
        />
        <DropdownListTemplate
          className={s.Widget}
          label={'Order'}
          value={order}
          onChangeFunc={value => setOrder(value)}
          data={[DESC, ASC]}
        />
      </div>

      <MoviesList
        listName={status}
        movies={userMovies}
      />

    </div>
  )
}