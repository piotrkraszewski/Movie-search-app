/* eslint-disable react-hooks/exhaustive-deps */
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
import BgGreen2 from './images/BgGreen2.jpg'

const API_KEY = 'api_key=cfe422613b250f702980a3bbf9e90716'
const BASE_API_URL = 'https://api.themoviedb.org'
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/'


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
  // sets intersteallar BgImage image on StarPage. Otherwise BgImage of searched movie
  const [backgroundIMG, setBackgroundIMG] = useState('https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg')

  const [suggestions, setSuggestions] = useState([])
  const [searchbarText, setSearchbarText] = useState('')
  
  
  async function fetchStartPage() {
    const startPageUrl = `${BASE_API_URL}/3/movie/popular?${API_KEY}`
    const response = await axios.get(startPageUrl)
    const res = response.data.results
    const popularMovies = res.map(a => [
      a.original_title,
      a.id,
      `${BASE_IMG_URL}w500${a.poster_path}`,
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
  
  useEffect(async () => {
    const res = await axios.get(`${BASE_API_URL}/3/movie/${movieID}?&${API_KEY}`)
    setMovieData(res.data)
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
    if (value.length === 0) setOldSearchbarText('')
    if (value.length >= 1) {
      let url = `${BASE_API_URL}/3/search/movie?query=%${value}&${API_KEY}`
      axios.get(url).then(response => {
        const res = response.data.results
        const movies = res
          .map(a => [
            a.original_title,
            a.id,
            `${BASE_IMG_URL}w500${a.poster_path}`,
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
    console.log(`searchbarText: ${searchbarText}`)
  }, [searchbarText])

  useEffect(() => {
    console.log(`sliceNumber: ${sliceNumber}`)
  }, [sliceNumber])

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
          value={{movieID, movieData, searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, handleChange, handleClickOnInput, queryData, setQueryData, setMovieID, fetchStartPage, backgroundIMG, setBackgroundIMG}}
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