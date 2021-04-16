import React from 'react'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'

export default function UserPanel() {
  const history = useHistory()
  const { currentUser, logout } = useAuth()

  async function handleLogout(){
    try{
      await logout()
      history.push('/')
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className='UserPanel'>
      <div className='userData'>
        <h2>User Panel</h2>
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
