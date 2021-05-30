import { useState, useEffect } from 'react'
import s from './MC_Display.module.sass'
import MoviesList from './MoviesList/MoviesList'
import Menu from './Menu/MC_Menu'
import orderBy from 'lodash/orderBy'
import { RATING, TITLE, DESC, ASC, MODIFIED, ADDED } from 'Utils/Consts'
import { AnimateSharedLayout } from "framer-motion"


export default function MC_Display({props}) {
  const {
    userMovies, setUserMovies,
    sortBy, setSortBy,
    order, setOrder
  } = props
  const [status, setStatus] = useState('Watching')


  useEffect(() => {
    sortBy === TITLE && setOrder(ASC)
    sortBy === RATING && setOrder(DESC)
    sortBy === MODIFIED && setOrder(DESC)
    sortBy === ADDED && setOrder(DESC)
    
    setUserMovies(orderBy(userMovies, sortBy.toLowerCase(), order))
  }, [sortBy])

  useEffect(() => {
    setUserMovies(orderBy(userMovies, sortBy.toLowerCase(), order))
  }, [order])


  return (
    <div className={s.MC_Display}>
      <AnimateSharedLayout>
        <Menu props={{
            userMovies, setUserMovies,
            status, setStatus,
            sortBy, setSortBy,
            order, setOrder
          }}
        />

        <MoviesList props={{userMovies, status}} />
      </AnimateSharedLayout>
    </div>
  )
}