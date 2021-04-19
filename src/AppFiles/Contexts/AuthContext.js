import { createContext, useContext, useEffect, useState } from 'react'
// import { useHistory, useLocation } from 'react-router-dom'
import firebase from 'Utils/firebase'
// import { HOME_PAGE, PROFILE_PAGE } from 'Utils/Consts'


const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export default function AuthProvider({children}) {
  // const location = useLocation()
  // const history = useHistory()
  const [user, setUser] = useState()
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)

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
    } catch(err){
      console.log(err)
    }
  }

  function resetPassword(email){
    return firebase.auth().sendPasswordResetEmail(email)
  }

  function updateEmail(email){
    return user.updateEmail(email)
  }

  function updatePassword(password){
    return user.updatePassword(password)
  }


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log('user:', user)
      setUser(user)
      setLoading(false)
    })
    
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{user, userData, setUserData, register, login, logout, handleLogout, resetPassword, updateEmail, updatePassword}}>
      {!loading && children}
    </AuthContext.Provider>
  )
}