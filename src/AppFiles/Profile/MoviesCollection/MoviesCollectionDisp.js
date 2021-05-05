/* eslint-disable react-hooks/exhaustive-deps */
import s from './MoviesCollection.module.sass'
import ProfilePosterCard from '../ProfilePosterCard/ProfilePosterCard'
import { START_PAGE_CARDS_TRANSITION } from 'Utils/Consts'
import useGotoOtherRoutes from 'Hooks/SearchbarHooks/useGotoOtherRoutes'


export default function MoviesCollectionDisp({userMovies}) {
  const {selectedMovieInProfilePage} = useGotoOtherRoutes() 


  return (
    <div className={s.MoviesCollection}>
      <h2>Movie List:</h2>
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
        ))}
      </div>
    </div>
  )
}