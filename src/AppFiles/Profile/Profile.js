import {useEffect, useState} from 'react'
import s from './Profile.module.sass'
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { PAGE_TRANSITION_TIME, UPDATE_PROFILE } from 'Utils/Consts'
import MoviesCollectionLogic from './MoviesCollection/MoviesCollectionLogic'


export default function Profile() {
  const history = useHistory()
  const { user, handleLogout, userData } = useAuth()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (userData.username)
      setLoading(false)
  }, [userData])


  return (
    <motion.div 
      className={s.Profile}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay :0.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: PAGE_TRANSITION_TIME }}
    >
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
          
        <MoviesCollectionLogic/>

      </div>
      }
    </motion.div>
  )
}