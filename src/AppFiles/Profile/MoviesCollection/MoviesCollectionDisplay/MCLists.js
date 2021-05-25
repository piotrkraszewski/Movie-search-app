import { useState, useEffect, useRef } from 'react'
import s from './MCLists.module.sass'
import orderBy from 'lodash/orderBy'
import MoviesList from './MoviesList/MoviesList'
import { WATCHING, STATUS_OPTIONS, RATING, ASC, DESC } from 'Utils/Consts'
import DropdownListTemplate from 'ReusableComponents/DropdownListTemplate'

export default function MCLists({userMovies, setUserMovies}) {
  const [status, setStatus] = useState(WATCHING)
  const [sortBy, setSortBy] = useState(RATING)
  const [order, setOrder] = useState(DESC)
  const statusOptionsIndex = useRef(0)


  // display not empty movie list on page load
  useEffect(() => {
    const moviesWithCurrentStatus = userMovies.filter(movie =>
      movie.status === STATUS_OPTIONS[statusOptionsIndex.current])

    moviesWithCurrentStatus.length
      ? setStatus(STATUS_OPTIONS[statusOptionsIndex.current])
      : statusOptionsIndex.current = statusOptionsIndex.current + 1
  }, [statusOptionsIndex.current])

  useEffect(() => {
    setUserMovies(orderBy(userMovies, RATING, DESC))
  }, [sortBy])

  useEffect(() => {
    setUserMovies(orderBy(userMovies, sortBy, order))
  }, [order])


  return (
    <div className={s.MCLists}>
      <div className={s.Widgets}>
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