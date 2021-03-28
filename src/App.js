/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import 'styles/main.scss'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import { AppContext } from 'AppFiles/Contexts/AppContext'
import AppScroolbar from 'utilities/Scroolbar/AppScrollbar'
import { getMoviesDataToDisplayInSearch, getAllMoviesData, getMovieData, createSearchMoviesUrl, setInitMovieID } from 'utilities/FetchFunctions'
import { POPULAR_MOVIES_URL, BASE_BG_IMG_URL } from 'utilities/Consts'
import { getCurrentPageUrl, getMovieIdFromLocationPathname } from 'utilities/RoutesFunctions'
import CalculateWindowHeightHook from 'utilities/CalculateWindowHeightHook'
import ArrowKeysReact from 'arrow-keys-react'
import AppBackground from 'AppFiles/AppBackground'
import StartPage from 'AppFiles/StartPage/StartPage'
import MoviePage from 'AppFiles/Movie/MoviePage'
import { isMobile } from "react-device-detect"

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
    if(searchbarText === '' && location.pathname ==='/') fetchPopularMoviesOnStartPage()
    else if(searchbarText === '') {
      setTimeout(() => {
        setSuggestions([])
      }, 600) // debounc time + animation time
    }
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
  const [dispPostersNum, setDispPostersNum] = useState(isMobile ? 9 : 12)

  const onSearchbarTextChanging = e => {
    const value = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchbarText(value)
    showResInSearchBar(value)
  }

  const showResInSearchBar = async (value) => {
    setDispPostersNum(isMobile ? 6 : 12)
    if (value.length === 0) setOldSearchbarText('')
    if (value.length >= 1) {
      const allMoviesData = await getAllMoviesData(createSearchMoviesUrl(value))
      const dataToDisplay = await getMoviesDataToDisplayInSearch(allMoviesData)

      setAllMoviesData(allMoviesData)
      setSuggestions(dataToDisplay)
      setOldSearchbarText(value)
    }
    
    isMobile && setTimeout(() => {
      setDispPostersNum(9)
    }, 1000) // adds 3 more posters
  }
  
  // ==== END Search state and functions ====

  
  // == ScrollBar stuff ==
  const infiniteScroll = e => {
    // console.log('infinite Scroll')
    setDispPostersNum(20)
  }

  const scrollBarRef = useRef(null)
  // == END ScrollBar stuff ==


// ==== Console log stuff ====
  useEffect(() => {
    console.log({suggestions})
  }, [suggestions])

  useEffect(() => {
    console.log({movieData})
    setBackgroundIMG(movieData.backdrop_path && `${BASE_BG_IMG_URL}${movieData.backdrop_path}`)
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
          value={{movieID, movieData, searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, suggestions, setSuggestions,  onSearchbarTextChanging, allMoviesData, setAllMoviesData, setMovieID, fetchPopularMoviesOnStartPage, showResInSearchBar, history, pushToHistory, dispPostersNum, setDispPostersNum, infiniteScroll, scrollBarRef}}
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