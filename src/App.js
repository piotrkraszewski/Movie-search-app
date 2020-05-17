import React, { useState, useEffect, useRef } from 'react'
import Search from './Search'
import Card from './Card'
import FullscreenSearch from './FullscreenSearch'
import axios from 'axios'
import './styles/main.scss'
import ArrowKeysReact from 'arrow-keys-react'

// myKey c61f42f858306ba4c3de925ee77d581d

export default function App (props) {
  // ==== Fetch first page ====
  const [movieID, setMovieID] = useState(157336)
  const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
  const [data, setData] = useState({})

  useEffect(() => {
    document.body.style.backgroundImage = 'url(https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg)'
      // 'url(https://wallpaperaccess.com/full/670449.jpg)'
    async function fetchApi () {
      const res = await axios.get(url)
      setData(res.data)
      console.log(res.data)
    }
    fetchApi()
  }, [movieID])
  // ==== END Fetch first page ====

  // ==== Search state and functions ====
  const [suggestions, setSuggestions] = useState([])
  const [text, setText] = useState(null)
  const [queryData, setQueryData] = useState([])
  const [sliceNumber, setSliceNumber] = useState(5)
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

  const suggestionsSelected = value => {
    if (text && value !== undefined) {
      setOldText(text)
      setText('')
      setMovieID(value[1])
    }
  }

  const handleClickOnInput = e => {
    if (text === '') {
      setText(oldText)
      setOldText('')
    }
  }
  // ==== END Search state and functions ====

  // ==== sugeston hide on click away ====
  const [show, setShow] = useState(false)
  const node = useRef()

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      // return function to be called when unmounted
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      setShow(true)
    } else {
      // outside click
      setShow(false)
    }
  }
  // ==== END sugeston hide on clic kaway ====

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
          <Search {...{show, setShow, text, setText, oldText, setOldText, cursor, setCursor, sliceNumber, setSliceNumber, suggestions, setSuggestions, suggestionsSelected, handleChange, handleClickOnInput, node, queryData}}
          />
          {/* <Card {...{data, movieID}} /> */}
          <FullscreenSearch {...{suggestions}} />
        </div>
      </div>
    </div>
  )
}