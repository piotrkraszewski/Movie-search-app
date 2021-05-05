import { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'Utils/firebase'
import { usersCollection } from 'Utils/firebase'

const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export default function AuthProvider({children}) {
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
      setUserData({})
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

  function loadUserData(){
    if (user){
      usersCollection.doc(user.uid).get().then(snapshot => {
        console.log(snapshot.data())
        setUserData(snapshot.data())
      }).catch(err => {
        console.log(err)
      })
    }
  }
  

  // sets firebase user
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log('user:', user)
      setUser(user)
      setLoading(false)
    })
    
    return unsubscribe
  }, [])


  // loads data about user if user exists
  useEffect(() => {
    loadUserData()
  }, [user])


  return (
    <AuthContext.Provider value={{user, userData, setUserData, loadUserData, register, login, logout, handleLogout, resetPassword, updateEmail, updatePassword}}>
      {!loading && children}
    </AuthContext.Provider>
  )
}