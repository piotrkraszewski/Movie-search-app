/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import './styles/main.scss'
import { Route, Switch, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { AppContext } from './AppFiles/AppContext'
import AppScroolbar from './Scroolbar/AppScrollbar'
// import CustomScrollbar from './Scroolbar/CustomScrollbar'
import { getMoviesDataToDisplayInSearch, getAllMoviesData, getMovieData } from './utilities/FetchFunctions'
import { API_KEY, BASE_API_URL, BASE_IMG_URL, INIT_BG_IMG, POPULAR_MOVIES_URL } from './utilities/Constans'
import ArrowKeysReact from 'arrow-keys-react'
import StartPage from './AppFiles/StartPage'
import Movie from './AppFiles/Movie'
import BgGreen2 from './images/BgGreen2.jpg'


export default function App () {
// === Routes Data ===
  const location = useLocation()  // key to app routes
  const pathname = location.pathname
  const getPathName = () => (
    pathname.substring(0, pathname.lastIndexOf("/") + 1)
  )
  const getInitialMovieID = () => (
    pathname.substring(pathname.lastIndexOf("/") + 1)
  )
// === END Routes Data ===




// ==== Fetch StartPage ====
  const [backgroundIMG, setBackgroundIMG] = useState(INIT_BG_IMG)
  const [suggestions, setSuggestions] = useState([])
  const [searchbarText, setSearchbarText] = useState('')

  async function fetchPopularMoviesOnStartPage() {
    setSuggestions(await getMoviesDataToDisplayInSearch(POPULAR_MOVIES_URL))
  }

  // if search is empty on main page it displays popular movies
  // loads at page starup because searchbarText === '' at start
  // checks this condition every time
  useEffect(() => {
    if(searchbarText === '') fetchPopularMoviesOnStartPage()
  }, [searchbarText])
// ==== END Fetch StartPage ====


// ==== Fetch movie page based on movieID parameter ====
  const [movieID, setMovieID] = useState(getInitialMovieID())
  const [movieData, setMovieData] = useState({})
  
  useEffect(async () => {
    setMovieData(await getMovieData(movieID))
  }, [movieID])
// ==== END Fetch movie page ====



// ==== Search state and functions ====
  // queryData - all data that we get from API
  const [queryData, setQueryData] = useState([])
  const [oldSearchbarText, setOldSearchbarText] = useState('')


  const handleChange = e => {
    const value = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchbarText(value)
    showResInSearchBar(value)
  }

  const showResInSearchBar = async (value) =>{
    if (value.length === 0) setOldSearchbarText('')
    if (value.length >= 1) {
      const url = `${BASE_API_URL}/3/search/movie?query=%${value}&${API_KEY}`

      const allMoviesData = await getAllMoviesData(url)
      const dataToDisplay = await getMoviesDataToDisplayInSearch(allMoviesData)

      setSuggestions(dataToDisplay)
      setQueryData(allMoviesData)
      setOldSearchbarText(value)
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
    console.log(`searchbarText: ${searchbarText}`)
  }, [searchbarText])

  useEffect(() => {
    console.log(`backgroundIMG: ${backgroundIMG}`)
  }, [backgroundIMG])

// ==== END Console log stuff ====

  return (
    <div>
      <div
        id='app'
        {...ArrowKeysReact.events}
        tabIndex='1'
      >
        <AppContext.Provider 
          value={{movieID, movieData, searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, suggestions, setSuggestions, handleChange, queryData, setQueryData, setMovieID, fetchPopularMoviesOnStartPage, backgroundIMG, setBackgroundIMG, BASE_IMG_URL, showResInSearchBar}}
        >
        <AppScroolbar>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={getPathName()}>
              <Route exact path='/' render={() => <StartPage/>} />
              <Route exact path={`/movie/:${movieID}`} render={() => <Movie/>} />
            </Switch>
          </AnimatePresence>
        </AppScroolbar>
        </AppContext.Provider>
      </div>

      <div className='BgGradient'/>
      <AnimatePresence >
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{duration: 1.5}}
          src={backgroundIMG !== `${BASE_IMG_URL}originalnull` ? backgroundIMG : BgGreen2}
          key={backgroundIMG}
          className='BgImage'
        />
      </AnimatePresence>

    </div>
  )
}