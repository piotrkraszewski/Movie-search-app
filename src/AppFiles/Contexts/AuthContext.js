import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import firebase from 'Utils/firebase'

const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export default function AuthProvider({children}) {
  const location = useLocation()
  const history = useHistory()
  const [currentUser, setCurrentUser] = useState()

  function register(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  function login(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  function logout(){
    return firebase.auth().signOut()
  }

  async function handleLogout(){
    try{
      await logout()
      if(location.pathname === '/user-panel')
        history.push('/')
    } catch(err){
      console.log(err)
    }
  }

  function resetPassword(email){
    return firebase.auth().sendPasswordResetEmail(email)
  }


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      setCurrentUser(user)
    })
    
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, register, login, logout, handleLogout, resetPassword}}>
      {children}
    </AuthContext.Provider>
  )
}