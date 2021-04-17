import React from 'react'
import './Profile.scss'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { UPDATE_PROFILE } from 'Utils/Consts'

export default function UserPanel() {
  const history = useHistory()
  const { currentUser, handleLogout } = useAuth()

  return (
    <div className='Profile'>
      <div className='userData'>
        <h2>Profile</h2>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>User-ID:</strong> {currentUser.uid}</p>
        <button 
          className='btn btn-primary'
          onClick={() => history.push(UPDATE_PROFILE)}
          >Update Profile
        </button>
        <button 
          className='btn btn-warning'
          onClick={() => handleLogout()}>
          Log out</button>
      </div>
    </div>
  )
}