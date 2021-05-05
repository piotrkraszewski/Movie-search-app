import {useEffect, useState} from 'react'
import s from './Profile.module.sass'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { UPDATE_PROFILE } from 'Utils/Consts'
import MoviesCollection from './MoviesCollection/MoviesCollection'

export default function Profile() {
  const history = useHistory()
  const { user, handleLogout, userData, loadUserData } = useAuth()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    loadUserData()
    if (userData)
      setLoading(false)
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
          {userData.movies && <MoviesCollection/>}
      </div>
      }
    </div>
  )
}