import {useState, useEffect} from 'react'
import s from './MovieStatusWidget.module.scss'
import firebase from 'Utils/firebase'
import {usersCollection} from 'Utils/firebase'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useMovieContext } from 'AppFiles/Contexts/MovieContext'
import DropdownListTemplate from 'ReusableComponents/DropdownListTemplate'
import { WATCHING, PLAN_TO_WATCH, COMPLETED, PAUSED, DROPPED, DELET_MOVIE_DATA, NO_RATING } from 'Utils/Consts'


export default function MovieStatusWidget() {
  const { movieID } = useMovieContext()
  const { user, userData, loadUserData } = useAuth()

  const initStatus = userData.movies[movieID] ? userData.movies[movieID] : {
    status: '',
    rating: null,
    modified: null,
  }

  const [movieStatus, setMovieStatus] = useState(initStatus)

  console.log(initStatus)

  useEffect(() => {
    // function definition
    async function saveMovieStatusToFirebase(actionType){
      let command
      if (actionType === 'update'){
        if(initStatus.status)
          command = {
            status: movieStatus.status,
            rating: movieStatus.rating,
            modified: firebase.firestore.Timestamp.now(),
          }
        else
        command = {
          status: movieStatus.status,
          rating: movieStatus.rating,
          modified: firebase.firestore.Timestamp.now(),
          added: firebase.firestore.Timestamp.now(),
        }
      }
      else if (actionType === 'delete'){
        command = firebase.firestore.FieldValue.delete()
      }


      try {
        await usersCollection.doc(user.uid).set({
          "movies": {
            [movieID]: command
          }
        }, { merge: true })
      } catch (err){
        console.log(err)
      }
    }

    // function execution
    if( movieStatus.status !== initStatus.status ||
        movieStatus.rating !== initStatus.rating ){
      async function updateMovieStatusToFirebase(){
        if(movieStatus.status === "Delete movie data"){
          await saveMovieStatusToFirebase('delete')
          setMovieStatus({
            status: '',
            rating: null,
          })
        } else {
          await saveMovieStatusToFirebase('update')
        }
      }
      updateMovieStatusToFirebase()
    }

    // will update global userData from firebase when unmonting object. firebase is a single source of truth
    return () => {
      loadUserData()
    }
  }, [movieStatus])


  return (
    <div className={s.MovieStatusWidgets}>
      <div className={s.Widgets}>
        <DropdownListTemplate
          className={s.Widget}
          label={'Status'}
          value={movieStatus.status}
          onChangeFunc={nextValue => setMovieStatus({
            ...movieStatus,
            status: nextValue
          })}
          data={[WATCHING, PLAN_TO_WATCH, COMPLETED, PAUSED, DROPPED, DELET_MOVIE_DATA]}
        />
        <DropdownListTemplate
          className={s.Widget}
          label={'Rating'}
          value={movieStatus.rating}
          onChangeFunc={nextValue => {
            if(nextValue === NO_RATING) nextValue = null
              movieStatus.status
              ? setMovieStatus({
                  ...movieStatus,
                  rating: nextValue
                })
                //sets complete status if user only rates show
              : setMovieStatus({
                  status: COMPLETED,
                  rating: nextValue
                })
          }}
          data={[5, 4, 3, 2, 1, NO_RATING]}
        />
      </div>

      <div className={s.dates}>
        {initStatus.modified &&
        <p>modified: <span>{initStatus.modified.toDate().toLocaleDateString()}</span></p>}
        {initStatus.added &&
        <p>added: <span>{initStatus.modified.toDate().toLocaleDateString()}</span></p>}
      </div>
    </div>
  )
}