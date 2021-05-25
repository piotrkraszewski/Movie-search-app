// import "react-widgets/scss/styles.scss"
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

  const initStatus = userData.movies && userData.movies[movieID]
  const [movieStatus, setMovieStatus] = useState({
    status: initStatus ? initStatus.status : '',
    rating: initStatus ? initStatus.rating : null
  })


  useEffect(() => {
    // function definition
    async function saveMovieStatusToFirebase(actionType){
      let command
      if (actionType === 'update'){
        command = {
          status: movieStatus.status,
          rating: movieStatus.rating,
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
        // setSubmitMsg({
        //   submitStatus: 'error',
        //   message: err.message
        // })
      }
    }

    // function execution
    if(movieStatus.status || movieStatus.rating){
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
  )
}