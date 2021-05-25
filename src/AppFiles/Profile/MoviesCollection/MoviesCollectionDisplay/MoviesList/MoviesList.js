import s from './MoviesList.module.sass'
import ProfileMovieCard from './ProfileMovieCard'
import { START_PAGE_CARDS_TRANSITION } from 'Utils/Consts'
import useGotoOtherRoutes from 'Hooks/SearchbarHooks/useGotoOtherRoutes'


export default function MoviesList({listName, movies}) {
  const {selectedMovieInProfilePage} = useGotoOtherRoutes()

  const MovieCard = (cardData) =>
    <ProfileMovieCard
      className='col-lg-2 col-md-3 col-sm-4 col-6'
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
        <div className='row'>
          { movies.length > 0 && movies.map(movie => (
            movie.status === listName && MovieCard(movie)
          ))}
        </div>
      </div>
    </div>
  )
}