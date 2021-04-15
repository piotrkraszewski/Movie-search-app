import { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'Utils/firebase'

const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export default function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()


  function register(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, register}}>
      {children}
    </AuthContext.Provider>
  )
}