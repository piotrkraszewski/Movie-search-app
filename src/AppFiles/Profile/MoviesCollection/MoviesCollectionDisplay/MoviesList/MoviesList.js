/* eslint-disable react-hooks/exhaustive-deps */
import s from '../../MoviesCollection.module.sass'
import ProfileMovieCard from './ProfileMovieCard'
import { START_PAGE_CARDS_TRANSITION } from 'Utils/Consts'
import useGotoOtherRoutes from 'Hooks/SearchbarHooks/useGotoOtherRoutes'


export default function MoviesCollectionDisp({listName, movies}) {
  const {selectedMovieInProfilePage} = useGotoOtherRoutes()

  const MovieCard = (cardData) =>
    <ProfileMovieCard
      className='col-xl-2 col-md-3 col-sm-4 col-6'
      cardData={cardData}
      onClick={selectedMovieInProfilePage}
      cardTransitionDuration={START_PAGE_CARDS_TRANSITION}
      imgTransition={0.5}
      imgHeight={'750'}
      imgWidth={'500'}
    />


  return (
    <div className={s.MoviesCollection}>
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