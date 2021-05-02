import {useEffect, useState} from 'react'
import s from './Profile.module.sass'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { UPDATE_PROFILE } from 'Utils/Consts'
import { usersCollection } from 'Utils/firebase'

export default function UserPanel() {
  const history = useHistory()
  const { user, handleLogout, userData, setUserData } = useAuth()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (userData.username)
      setLoading(false)

    // usersCollection.doc(user.uid).get().then(snapshot => {
    //   console.log(snapshot.data())
    //   setUserData(snapshot.data())
    //   setLoading(false)
    // }).catch(err => {
    //   console.log(err)
    // })
  }, [])


  return (
    <div className={s.Profile}>
      { !loading &&
      <div className={s.container}>
        <div className={s.profileCard}>
          <h2>Profile</h2>
          <div className={s.userData}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {userData.username}</p>
          </div>
          <div className={s.buttons}>
            <button 
              className={`${s.button} btn btn-success`}
              onClick={() => history.push(UPDATE_PROFILE)}
              >Update Profile
            </button>
            <button 
              className={`${s.button} btn btn-dark`}
              onClick={() => handleLogout()}>
              Log out</button>
          </div>
        </div>
      </div>
      }
    </div>
  )
}