import React from 'react'
import { useAuth } from 'AppFiles/Contexts/AuthContext'

export default function UserPanel() {
  const { currentUser, handleLogout } = useAuth()

  return (
    <div className='UserPanel'>
      <div className='userData'>
        <h2>Profile</h2>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>User-ID:</strong> {currentUser.uid}</p>
        <button className='btn btn-primary'>Update Profile</button>
        <button 
        className='btn btn-warning'
        onClick={() => handleLogout()}>
          Log out</button>
      </div>
    </div>
  )
}