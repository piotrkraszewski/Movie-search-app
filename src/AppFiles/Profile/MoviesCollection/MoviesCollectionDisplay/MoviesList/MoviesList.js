import s from './MoviesList.module.sass'
import ProfileMovieCard from './ProfileMovieCard'
import { START_PAGE_CARDS_TRANSITION } from 'Utils/Consts'
import useGotoOtherRoutes from 'Hooks/SearchbarHooks/useGotoOtherRoutes'


export default function MoviesList({listName, movies}) {
  const {selectedMovieInProfilePage} = useGotoOtherRoutes()

  const MovieCard = (cardData) =>
    <ProfileMovieCard
      cardData={cardData}
      onClick={selectedMovieInProfilePage}
      cardTransitionDuration={START_PAGE_CARDS_TRANSITION}
      imgTransition={0.5}
      imgHeight={'750'}
      imgWidth={'500'}
    />


  return (
    <div className={s.MoviesList}>
      <div>
        <h2>{listName}</h2>
        <div className={s.grid}>
          { movies.length > 0 && movies.map(movie => (
            movie.status === listName && MovieCard(movie)
          ))}
        </div>
      </div>
    </div>
  )
}