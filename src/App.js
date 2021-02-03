import { useState, useEffect } from 'react'
import StartPage from './StartPage';
import Movie from './Movie';
import axios from 'axios'
import './styles/main.scss'
import ArrowKeysReact from 'arrow-keys-react'
import { Route } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


export default function App () {
  // ==== Fetch StartPage ====
  const [suggestions, setSuggestions] = useState([])
  const [searchbarText, setSearchbarText] = useState(null)
  let startPageUrl = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716&language=en-US&page=1`
  
  async function fetchStartPage() {
    const response = await axios.get(startPageUrl)
    const res = response.data.results
    let movies = res.map(a => [
      a.original_title,
      a.id,
      `https://image.tmdb.org/t/p/w500${a.poster_path}`,
    ])
    setSuggestions(movies)
  }

  // Fetch StarPage on app lunch
  useEffect(() => {
    fetchStartPage() 
  }, [])
  
  // if search is empty on main page it displays start page
  // checks this condition every time
  useEffect(() => {
    if(searchbarText === '' ){fetchStartPage()}
  })
  // ==== END Fetch StartPage ====


  // ==== Fetch movie page based on movieID parameter ====
  const [movieID, setMovieID] = useState(157336)
  const [movieData, setMovieData] = useState({})
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`

  useEffect(() => {
    document.body.style.backgroundImage = 'url(https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg)'
      // 'url(https://wallpaperaccess.com/full/670449.jpg)'
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
    if (value.length === 0) {
      setOldSearchbarText('')
    }
    if (value.length >= 1) {
      let url = `https://api.themoviedb.org/3/search/movie?query=%${value}&api_key=cfe422613b250f702980a3bbf9e90716`
      axios.get(url).then(response => {
        const res = response.data.results
        let movies = res
          .map(a => [
            a.original_title,
            a.id,
            `https://image.tmdb.org/t/p/w500${a.poster_path}`,
          ])
          .slice(0, sliceNumber)
        console.log(movies)
        setSuggestions(movies)
        setQueryData(response.data.results)
        setOldSearchbarText(value)
      })
    } else {
      setCursor(-1)
      setTimeout(() => {
        // suggestion window closes after 500ms - dont think it works
        setSuggestions([])
      }, 500)
    }
  }

  const handleClickOnInput = e => {
    if (searchbarText === '') {
      setSearchbarText(oldSearchbarText)
      setOldSearchbarText('')
    }
  }
  // ==== END Search state and functions ====


  // === Check if input changed ===
  // const [change, setChange] = useState(0)
  /*
  let timer = null
  const handleCheck = () => {
    // Clears running timer and starts a new one each time the user types
    clearTimeout(timer);
    timer = setTimeout(() => {
      toggleCheck();
    }, 1000);
  }

  const toggleCheck = () => {
    setStartPageSuggestions(suggestions)
    setChange(() => change + 1)
    console.log(change)
  }

  if(text !== oldText){
    handleCheck()
  } 
  */
// === END Check if input changed ===

useEffect(() => {
  console.log('suggenstions: ' + suggestions)
}, [suggestions])

const routes = [
  { path: '/', name: 'StartPage', Component: StartPage },
  { path: `/movie/:movieID`, name: 'Movie', Component: Movie }
]

  return (
    <div
      className='container-fluid w-95 h-95'
      id='app'
      {...ArrowKeysReact.events}
      tabIndex='1'
      style={{ outline: 0 }}
    >
      <div className='row'>
        <div className='col-12 col-lg-10 offset-lg-1 myContainer'>
          {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={2000}
                    classNames="Swich"
                    unmountOnExit
                  >
                    <div className="page">
                      <Component {...{movieID, text: searchbarText, setText: setSearchbarText, oldText: oldSearchbarText, setOldText: setOldSearchbarText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, handleChange, handleClickOnInput, queryData, setMovieID, movieData, fetchStartPage}}/>
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}

          {/* <Switch>
            <Route exact path='/' render={() => 
              <StartPage {...{text, oldText, handleChange, handleClickOnInput, suggestions, setMovieID, change, startPageSuggestions}} />} />

            <Route exact path={`/movie/:${movieID}`} render={routeProps => 
              <Movie {...{routeProps, text, setText, oldText, setOldText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, handleChange, handleClickOnInput, queryData, setMovieID, data, fetchStartPage}} />} />

          </Switch> */}
        </div>
      </div>
    </div>
  )
}