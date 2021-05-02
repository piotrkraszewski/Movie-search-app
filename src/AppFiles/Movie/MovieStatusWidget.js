// import "react-widgets/scss/styles.scss"
import {useState, useEffect} from 'react'
import './MovieStatusWidget.scss'
import DropdownList from "react-widgets/DropdownList"
import firebase from 'Utils/firebase'
import {usersCollection} from 'Utils/firebase'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useMovieContext } from 'AppFiles/Contexts/MovieContext'


export default function MovieStatusWidget() {
  const { movieID } = useMovieContext()
  const { user, userData, loadUserData } = useAuth()

  const initStatus = userData.movies[movieID]
  const [movieStatus, setMovieStatus] = useState({
    status: initStatus ? initStatus.status : '',
    rating: initStatus ? initStatus.rating : ''
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
            rating: '',
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
    <div className='MovieStatusWidgets'>
      <div className='Widget'>
        <p>Status</p>
        <DropdownList
          filter={false}  // prevents from writing in box
          value={movieStatus.status}
          onChange={nextValue => setMovieStatus({
            ...movieStatus,
            status: nextValue
          })}
          textField="color"
          data={["Watching", "Plan to watch", "Completed", "Paused", "Dropped", "Delete movie data"]}
        />
      </div>
      <div className='Widget'>
        <p>Rating</p>
        <DropdownList
          filter={false}  // prevents from writing in box
          value={movieStatus.rating}
          onChange={nextValue => setMovieStatus({
            ...movieStatus,
            rating: nextValue
          })}
          textField="color"
          data={['1', '2', '3', '4', '5']}
        />
      </div>
    </div>
  )
}