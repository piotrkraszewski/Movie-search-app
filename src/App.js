import { useState, useEffect } from 'react'
import './styles/main.scss'
import { Route, Switch, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { AppContext } from './AppFiles/AppContext'
import axios from 'axios'
import AppScroolbar from './Scroolbar/AppScroolbar'
import ArrowKeysReact from 'arrow-keys-react'
import StartPage from './AppFiles/StartPage'
import Movie from './AppFiles/Movie'
// import BG_black from './images/BG_black.jpg'

export default function App () {
  
// === Routes Data ===
  const location = useLocation()  // key to app routes
  const getPathName = () => {
    let pathname = location.pathname
    pathname = pathname.substring(0, pathname.lastIndexOf("/") + 1)
    return pathname
  }
  const getInitialMovieID = () => {
    const pathname = location.pathname
    const movieID = pathname.substring(pathname.lastIndexOf("/") + 1)
    return movieID
  }
// === END Routes Data ===


// ==== Fetch StartPage ====
  // sets interseallar BgImage image on StarPage. Otherwise BgImage of searched movie
  const [backgroundIMG, setBackgroundIMG] = useState('https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg')

  const [suggestions, setSuggestions] = useState([])
  const [searchbarText, setSearchbarText] = useState('')
  let startPageUrl = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716&language=en-US&page=1`
  
  async function fetchStartPage() {
    const response = await axios.get(startPageUrl)
    const res = response.data.results
    const popularMovies = res.map(a => [
      a.original_title,
      a.id,
      `https://image.tmdb.org/t/p/w500${a.poster_path}`,
    ])
    setSuggestions(popularMovies)
  }
  
  // if search is empty on main page it displays start page 
  // loads at page starup because searchbarText === '' at start
  // checks this condition every time
  useEffect(() => {
    if(searchbarText === '' ){fetchStartPage()} 
  }, [searchbarText])
// ==== END Fetch StartPage ====


// ==== Fetch movie page based on movieID parameter ====
  const [movieID, setMovieID] = useState(getInitialMovieID())
  const [movieData, setMovieData] = useState({})
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`

  useEffect(() => {
    async function fetchMovieFromApi () {
      const res = await axios.get(movieUrl)
      setMovieData(res.data)
    }
    fetchMovieFromApi()
  }, [movieID])
// ==== END Fetch movie page ====



// ==== Search state and functions ====
  const [queryData, setQueryData] = useState([]) // all data that we get from API
  const [sliceNumber, setSliceNumber] = useState(5) //how many results are displayed on quick search
  const [oldSearchbarText, setOldSearchbarText] = useState('')
  const [cursor, setCursor] = useState(0)

  const handleChange = e => {
    const value = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchbarText(value)
    showResInSearchBar(value)
  }

  const showResInSearchBar = (value)=>{
    if (value.length === 0) {
      setOldSearchbarText('')
    }
    if (value.length >= 1) {
      let url = `https://api.themoviedb.org/3/search/movie?query=%${value}&api_key=cfe422613b250f702980a3bbf9e90716`
      axios.get(url).then(response => {
        const res = response.data.results
        const movies = res
          .map(a => [
            a.original_title,
            a.id,
            `https://image.tmdb.org/t/p/w500${a.poster_path}`,
          ])
          .slice(0, sliceNumber)
        setSuggestions(movies)
        setQueryData(response.data.results)
        setOldSearchbarText(value)
      })
    } 
  }

  const handleClickOnInput = async e => {
    if (searchbarText === '') {
      showResInSearchBar(oldSearchbarText)
      setSearchbarText(oldSearchbarText)
      setOldSearchbarText('')
    }
  }
// ==== END Search state and functions ====



// ==== Console log stuff ====
  useEffect(() => {
    console.log(`%c queryData.length: ${queryData.length}`, 'color: pink')
    console.log(`%c suggestions.length: ${suggestions.length}`, 'color: pink')
  }, [queryData])

  useEffect(() => {
    console.log({suggestions})
  }, [suggestions])

  useEffect(() => {
    console.log({movieData})
  }, [movieData])

  useEffect(() => {
    console.log('searchbarText: ' + searchbarText)
  }, [searchbarText])

  useEffect(() => {
    console.log(`sliceNumber: ${sliceNumber}`)
  }, [sliceNumber])

// ==== END Console log stuff ====


  return (
    <div>
      <div
        id='app'
        {...ArrowKeysReact.events}
        tabIndex='1'
      >
        <AppContext.Provider 
          value={{movieID, movieData, searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, handleChange, handleClickOnInput, queryData, setQueryData, setMovieID, fetchStartPage, backgroundIMG, setBackgroundIMG}}
        >
          <AnimatePresence exitBeforeEnter>
            <AppScroolbar>
              <Switch location={location}  key={getPathName()}>
                <Route exact path='/' render={() => <StartPage/>} />
                <Route exact path={`/movie/:${movieID}`} render={() => <Movie/>} />
              </Switch>
            </AppScroolbar>
          </AnimatePresence>
        </AppContext.Provider>
      </div>

      <div className='BgGradient'/>
      <AnimatePresence >
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // transition={ getPathName() === "movie" ? {duration: 2} : {duration: 1} }
          transition={{duration: 1.5}}
          src={backgroundIMG}
          key={backgroundIMG}
          className='BgImage'
        />
      </AnimatePresence>

    </div>
  )
}