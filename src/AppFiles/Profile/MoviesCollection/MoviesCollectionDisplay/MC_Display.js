import { useState } from 'react'
import s from './MC_Display.module.sass'
import MoviesList from './MoviesList/MoviesList'
import Menu from './Menu/MC_Menu'


export default function MCLists({userMovies, setUserMovies}) {
  const [status, setStatus] = useState('Watching')

  return (
    <div className={s.MCLists}>

      <Menu
        userMovies={userMovies}
        setUserMovies={setUserMovies}
        status={status}
        setStatus={setStatus}
      />

      <MoviesList
        status={status}
        userMovies={userMovies}
      />

    </div>
  )
}