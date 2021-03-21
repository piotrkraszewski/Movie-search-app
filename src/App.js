/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import './styles/main.scss'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import { AppContext } from './AppFiles/Contexts/AppContext'
import AppScroolbar from './utilities/Scroolbar/AppScrollbar'
import { getMoviesDataToDisplayInSearch, getAllMoviesData, getMovieData, createSearchMoviesUrl, setInitMovieID } from './utilities/FetchFunctions'
import { POPULAR_MOVIES_URL } from './utilities/Consts'
import { getCurrentPageUrl, getMovieIdFromLocationPathname } from './utilities/RoutesFunctions'
import CalculateWindowHeightHook from './utilities/CalculateWindowHeightHook'
import ArrowKeysReact from 'arrow-keys-react'
import AppBackground from './AppFiles/AppBackground'
import StartPage from './AppFiles/StartPage/StartPage'
import MoviePage from './AppFiles/Movie/MoviePage'


export default function App () {
  const location = useLocation()  // key to app routes
  const history = useHistory()
  const pushToHistory = url => history.push(url)


// ==== Fetch StartPage ====
  const [backgroundIMG, setBackgroundIMG] = useState()
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
  const [movieID, setMovieID] = useState(() => setInitMovieID(location))
  const [movieData, setMovieData] = useState({})
  
  useEffect(async () => {
    movieID && setMovieData(await getMovieData(movieID))
    console.log(movieID)
  }, [movieID])

  // implements back button in browser
  // allows to go back to previous movie on moviePage
  useEffect(() => {
    setMovieID(getMovieIdFromLocationPathname(location))
  }, [location.pathname])
  
// ==== END Fetch movie page ====



// ==== Search state and functions ====
  const [allMoviesData, setAllMoviesData] = useState([])
  const [oldSearchbarText, setOldSearchbarText] = useState('')


  const onSearchbarTextChanging = e => {
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
  // useEffect(() => {
  //   console.log(`allMoviesData.length ${allMoviesData.length}`)
  //   console.log(`suggestions.length ${allMoviesData.length}`)
  // }, [allMoviesData])

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
      <CalculateWindowHeightHook/>
      <AppBackground backgroundIMG={backgroundIMG}/>

      <div
        id='app'
        {...ArrowKeysReact.events}
        tabIndex='1'
      >
        <AppContext.Provider 
          value={{movieID, movieData, searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, suggestions, setSuggestions,  onSearchbarTextChanging, allMoviesData, setAllMoviesData, setMovieID, fetchPopularMoviesOnStartPage, showResInSearchBar, history, pushToHistory}}
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
    </div>
  )
}