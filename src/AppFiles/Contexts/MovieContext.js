import { BASE_BG_IMG_URL } from 'Utils/Consts'
import { useState, useEffect, createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { getMovieData, setInitMovieID } from 'Utils/FetchFunctions'
import { getMovieIdFromLocationPathname } from 'Utils/RoutesFunctions'
import AppBackground from 'ReusableComponents/AppBackground/AppBackground'
import BgGreen from 'Images/BgGreen.jpg'


const MovieContext = createContext()
export function useMovieContext(){
  return useContext(MovieContext)
}


export default function MovieProvider({children}){
  const location = useLocation()
  const [movieID, setMovieID] = useState(() => setInitMovieID(location))
  const [movieData, setMovieData] = useState({})
  const [backgroundIMG, setBackgroundIMG] = useState()


  // get movieID from location
  // allows to correctly go back to previous movie on MoviePage
  useEffect(() => {
    if(location.pathname.includes('/movie/'))
      setMovieID(getMovieIdFromLocationPathname(location))
  }, [location])


  // get MovieData based on movieID
  useEffect(() => {
    console.log(`movieID: ${movieID}`)
    async function getData(){
      movieID && setMovieData(await getMovieData(movieID))
    }
    getData()
  }, [movieID])


  //set BackgroundIMG base on movieData 
  useEffect(() => {
    // console.log({movieData})
    setBackgroundIMG(movieData.backdrop_path && `${BASE_BG_IMG_URL}${movieData.backdrop_path}`)
  }, [movieData])

  return (
    <MovieContext.Provider value={{movieID, setMovieID, movieData}}>
      <AppBackground 
        fetchImg={backgroundIMG} 
        fallbackImg={BgGreen}
      />
      {children}
    </MovieContext.Provider>
  )
}