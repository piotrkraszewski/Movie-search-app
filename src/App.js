import { useState, useEffect } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import { AppContext } from 'AppFiles/Contexts/AppContext'
import AppScroolbar from 'ReusableComponents/AppScroollbar/AppScrollbar'
import { getMoviesDataToDisplayInSearch, getAllMoviesData,  createSearchMoviesUrl } from 'Utils/FetchFunctions'
import { POPULAR_MOVIES_URL, HOME_PAGE, MOVIE_PAGE, REGISTER_PAGE, LOGIN_PAGE, FORGOT_PASSWORD, PROFILE_PAGE, UPDATE_PROFILE } from 'Utils/Consts'
import { getCurrentPageUrl } from 'Utils/RoutesFunctions'
import ArrowKeysReact from 'arrow-keys-react'

import StartPage from 'AppFiles/StartPage/StartPage'
import MoviePage from 'AppFiles/Movie/MoviePage'
import { isMobile } from "react-device-detect"

import Navbar from 'AppFiles/Navbar/Navbar'
import Register from 'AppFiles/Forms/Register/Register'
import Login from 'AppFiles/Forms/Login/Login'
import AuthProvider from 'AppFiles/Contexts/AuthContext'
import Profile from 'AppFiles/Profile/Profile'
import ForgotPassword from 'AppFiles/Forms/ForgotPassword/ForgotPassword'
import UpdateProfile from 'AppFiles/Forms/UpdateProfile/UpdateProfile'
import PrivateRoute from 'Utils/PrivateRoute'
import { useMovieContext } from 'AppFiles/Contexts/MovieContext'


export default function App () {
  const { movieID } = useMovieContext()
  const location = useLocation()  // key to app routes
  const history = useHistory()
  const pushToHistory = url => history.push(url)


// ==== Fetch StartPage ====
  const [suggestions, setSuggestions] = useState([])
  const [searchbarText, setSearchbarText] = useState('')

  async function fetchPopularMoviesOnStartPage() {
    setSuggestions(await getMoviesDataToDisplayInSearch(POPULAR_MOVIES_URL))
  }

  useEffect(() => {
    // HomePage: if search is empty display popular movies
    if(location.pathname === '/' && !searchbarText)
      fetchPopularMoviesOnStartPage()  

    // dont clear movies when we transitioning out of Main page
    else if(searchbarText === '' && location.pathname !=='/') {
      setTimeout(() => {
        setSuggestions([])
      }, 600) // debounc time + animation time
    }
  }, [searchbarText, location.pathname])

// ==== END Fetch StartPage ====



// ==== Search state and functions ====
  const [allMoviesData, setAllMoviesData] = useState([])
  const [dispPostersNum, setDispPostersNum] = useState(isMobile ? 9 : 12)

  const onSearchbarTextChanging = e => {
    const value = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchbarText(value)
    showResInSearchBar(value)
  }

  const showResInSearchBar = async (value) => {
    setDispPostersNum(isMobile ? 6 : 12)
    if (value.length >= 1) {
      const allMoviesData = await getAllMoviesData(createSearchMoviesUrl(value))
      const dataToDisplay = await getMoviesDataToDisplayInSearch(allMoviesData)

      setAllMoviesData(allMoviesData)
      setSuggestions(dataToDisplay)
    }
    
    isMobile && setTimeout(() => {
      setDispPostersNum(9)
    }, 1000) // adds 3 more posters
  }

  // State of MovieSeachbar
  const [showQuickSearchRes, setShowQuickSearchRes] = useState(false)
  const [indexOfHighlightedMovie, setIndexOfHighlightedMovie] = useState()
  
  // ==== END Search state and functions ====



// ==== Console log stuff ====
  useEffect(() => {
    console.log({suggestions})
  }, [suggestions])

  // useEffect(() => {
  //   console.log(`searchbarText: ${searchbarText}`)
  // }, [searchbarText])

  // useEffect(() => {
  //   console.log(`showQuickSearchRes: ${showQuickSearchRes}`)
  // }, [showQuickSearchRes])

// ==== END Console log stuff ====


  return (
    <div>
      <div
        id='app'
        {...ArrowKeysReact.events}
        tabIndex='1'
      >
        <AppContext.Provider 
          value={{searchbarText, setSearchbarText, suggestions, setSuggestions,  onSearchbarTextChanging, allMoviesData, setAllMoviesData,  fetchPopularMoviesOnStartPage, showResInSearchBar, history, location, pushToHistory, dispPostersNum, setDispPostersNum, showQuickSearchRes, setShowQuickSearchRes, indexOfHighlightedMovie, setIndexOfHighlightedMovie}}
        >
          <AuthProvider>
            <Navbar/>
            <AppScroolbar>
              <AnimatePresence exitBeforeEnter>
                <Switch 
                  location={location} 
                  key={getCurrentPageUrl(location)}
                >
                  <Route exact path={HOME_PAGE} render={() => <StartPage/>} />
                  <Route exact path={`${MOVIE_PAGE}:${movieID}`} render={() => <MoviePage/>} />
                  <Route exact path={REGISTER_PAGE} render={() => <Register/>} />
                  <Route exact path={LOGIN_PAGE} render={() => <Login/>} />
                  <Route exact path={FORGOT_PASSWORD} render={() => <ForgotPassword/>} />
                  <PrivateRoute exact path={PROFILE_PAGE} component={Profile} />
                  <PrivateRoute exact path={UPDATE_PROFILE} component={UpdateProfile} />
                </Switch>
              </AnimatePresence>
          </AppScroolbar>
          </AuthProvider>
        </AppContext.Provider>
      </div>
    </div>
  )
}