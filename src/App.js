/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import './styles/main.scss'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { AppContext } from './AppFiles/Contexts/AppContext'
import AppScroolbar from './utilities/Scroolbar/AppScrollbar'
import { getMoviesDataToDisplayInSearch, getAllMoviesData, getMovieData, createSearchMoviesUrl } from './utilities/FetchFunctions'
import { INIT_BG_IMG, POPULAR_MOVIES_URL, NOT_FOUND_BG_IMG } from './utilities/Consts'
import { getCurrentPageUrl, getMovieIdFromLocationPathname } from './utilities/RoutesFunctions'
import ArrowKeysReact from 'arrow-keys-react'
import StartPage from './AppFiles/StartPage'
import MoviePage from './AppFiles/Movie/MoviePage'
import BgGreen2 from './images/BgGreen2.jpg'


export default function App () {
  const location = useLocation()  // key to app routes
  const history = useHistory()
  const pushToHistory = url => history.push(url)

  // implements back button in browser
  // allows to go back to previous movie on moviePage
  useEffect(() => {
    setMovieID(getMovieIdFromLocationPathname(location))
  }, [location.pathname])


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
  const [movieID, setMovieID] = useState(getMovieIdFromLocationPathname(location))
  const [movieData, setMovieData] = useState({})
  
  useEffect(async () => {
    setMovieData(await getMovieData(movieID))
  }, [movieID])
// ==== END Fetch movie page ====



// ==== Search state and functions ====
  // queryData - all data that we get from API
  const [allMoviesData, setAllMoviesData] = useState([])
  const [oldSearchbarText, setOldSearchbarText] = useState('')


  const handleChange = e => {
    const value = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchbarText(value)
    showResInSearchBar(value)
  }

  const showResInSearchBar = async (value) => {
    if (value.length === 0) setOldSearchbarText('')
    if (value.length >= 1) {
      const allMoviesData = await getAllMoviesData(createSearchMoviesUrl(value))
      const dataToDisplay = await getMoviesDataToDisplayInSearch(allMoviesData)

      setAllMoviesData(allMoviesData)
      setSuggestions(dataToDisplay)
      setOldSearchbarText(value)
    }
  }

  
// ==== END Search state and functions ====


// ==== Console log stuff ====
  useEffect(() => {
    console.log(`allMoviesData.length ${allMoviesData.length}`)
    console.log(`suggestions.length ${allMoviesData.length}`)
  }, [allMoviesData])

  useEffect(() => {
    console.log({suggestions})
  }, [suggestions])

  useEffect(() => {
    console.log({movieData})
    setBackgroundIMG(`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`)
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
          value={{movieID, movieData, searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, suggestions, setSuggestions, handleChange, allMoviesData, setAllMoviesData, setMovieID, fetchPopularMoviesOnStartPage, showResInSearchBar, history, pushToHistory}}
        >
          <AppScroolbar>
            <AnimatePresence exitBeforeEnter>
              <Switch 
                location={location} 
                key={getCurrentPageUrl(location)}
              >
                <Route exact path='/' render={() => <StartPage/>} />
                <Route exact path={`/movie/:${movieID}`} render={() => <MoviePage/>} />
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
          src={backgroundIMG !== NOT_FOUND_BG_IMG ? backgroundIMG : BgGreen2}
          key={backgroundIMG}
          className='BgImage'
        />
      </AnimatePresence>

    </div>
  )
}