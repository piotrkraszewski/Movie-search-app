import React from 'react'
// import { motion, AnimatePresence } from "framer-motion"

export default function Register() {
  return (
    <div className='Register'>
      <h2>Register Page</h2>
      {/* <h3>{islogged ? 'Logged in' : 'Not logged in'}</h3> */}
      <div className="form">
        <div className='line'/>
        <input 
          placeholder="Username" 
          // value={login} 
          // onChange={e => onLoginChange(event.target.value)}
        />
        <input 
          placeholder="Password" 
          // value={password} 
          // onChange={e => onPasswordChange(event.target.value)}
        />
        <button 
          className="btn btn-success btn-green"
          // onClick={loginUser}
          >Log In
        </button>
        <button 
          className="btn btn-warning"
          // onClick={onOpenConfirmModal}
          >Clear login data
        </button>
      </div>
    </div>
  )
}