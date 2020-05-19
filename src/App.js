import React, { useState, useEffect, useRef } from 'react'
import StartPage from './StartPage';
import Movie from './Movie';
import axios from 'axios'
import './styles/main.scss'
import ArrowKeysReact from 'arrow-keys-react'
import {Route, Switch} from 'react-router-dom';


export default function App (props) {
  // ==== Fetch first movie page ====
  const [movieID, setMovieID] = useState(157336)
  const [data, setData] = useState({})
  const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`

  useEffect(() => {
    document.body.style.backgroundImage = 'url(https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg)'
      // 'url(https://wallpaperaccess.com/full/670449.jpg)'
    async function fetchApi () {
      const res = await axios.get(url)
      setData(res.data)
      // console.log(res.data)
    }
    fetchApi()
  }, [movieID])
  // ==== END Fetch first movie page ====

  // ==== Fetch StartPage ====
  const [popularMovies, setPopularMovies] = useState()
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    let urlStartPage = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716&language=en-US&page=1`
    async function fetchStartPage () {
      const response = await axios.get(urlStartPage)
      const res = response.data.results
      console.log(res)
      let movies = res
          .map(a => [
            a.original_title,
            a.id,
            `https://image.tmdb.org/t/p/w500${a.poster_path}`,
          ])
          setPopularMovies(movies)
          setSuggestions(movies)
          // setQueryData(response.data.results)
    }
    fetchStartPage () 
  }, [movieID])


  // ==== Search state and functions ====
  const [text, setText] = useState(null)
  const [queryData, setQueryData] = useState([])
  const [sliceNumber, setSliceNumber] = useState(20)
  const [oldText, setOldText] = useState('')
  const [cursor, setCursor] = useState(0)

  const handleChange = e => {
    const value = e.target.value.replace(/[^\w\s]/gi, '')
    setText(value)
    if (value.length === 0) {
      setOldText('')
    }
    if (value.length >= 1) {
      let url = `https://api.themoviedb.org/3/search/movie?query=%${value}&api_key=cfe422613b250f702980a3bbf9e90716`
      axios.get(url).then(response => {
        const res = response.data.results
        console.log(res)
        let movies = res
          .map(a => [
            a.original_title,
            a.id,
            `https://image.tmdb.org/t/p/w500${a.poster_path}`,
            // a.overview.substring(0, 150).concat('...'),
            // a.release_date
          ])
          .slice(0, sliceNumber)
        console.log(movies)
        setSuggestions(movies)
        setQueryData(response.data.results)
        setOldText(value)
      })
    } else {
      setCursor(-1)
      setTimeout(() => {
        // okno sugesti z opóŸnieniem gaœnie
        setSuggestions([])
      }, 500)
    }
  }

  const handleClickOnInput = e => {
    if (text === '') {
      setText(oldText)
      setOldText('')
    }
  }
  // ==== END Search state and functions ====


  

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
          <Switch>
          <Route exact path='/' render={() => 
              <StartPage {...{text, oldText, handleChange, handleClickOnInput, suggestions, setMovieID}} />} />

            <Route exact path={`/movie/:${movieID}`} render={routeProps => 
              <Movie {...{routeProps, text, setText, oldText, setOldText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, handleChange, handleClickOnInput, queryData, setMovieID, data}} />} />

          </Switch>
        </div>
      </div>
    </div>
  )
}