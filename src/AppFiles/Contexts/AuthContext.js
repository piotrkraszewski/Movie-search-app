import { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'Utils/firebase'

const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export default function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  // const [loading, setLoading] = useState(true)

  function register(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  function login(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  function logout(){
    return firebase.auth().signOut()
  }

  function resetPassword(email){
    return firebase.auth().sendPasswordResetEmail(email)
  }


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      // setLoading(false)
      setCurrentUser(user)
    })
    
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, register, login, logout, resetPassword}}>
      {children}
    </AuthContext.Provider>
  )
}