import React, { useState, useEffect, useRef } from 'react'
import Search from './Search'
import Card from './Card'
import axios from 'axios'
import './styles/main.scss'
import ArrowKeysReact from 'arrow-keys-react'

// myKey c61f42f858306ba4c3de925ee77d581d

export default function App () {
  // ==== Fetch first page ====
  const [movieID, setMovieID] = useState(157336)
  const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
  const [data, setData] = useState({})

  useEffect(() => {
    document.body.style.backgroundImage = "url(https://lh3.googleusercontent.com/ZdEaJCCAfkI-PrkHmY0XYFfbdFlgDBFC6jJCLj9hN5THcsKd9GpE0j8pS8HM3z-QCrlkPvUxqxks6yXHO2X4H16YHoMLYcKg7genJH34cWzNiobbZhxQow1tqav6TfXVbrHQ1keP80bVGOgdJt4_UkQMLTq3HqlmJquH5Mvubn7ixo7rno31drUkYIeFgB5mxW4psxvbFvgRTM5CbP8J-GTQ5Ur20j-pBBhU6K2Du4C30G-gPyII7ZAvxzFVTdx_P_VAJLbjrUQ4XIv5PFnbUepa4sQFeJw1Brv4lNtmogTTRZFB2ZuZkP0U_WbFAKgHcgcr8T6WHp1kGG2zyMn3O7x7Qx0vLSNn35Fe2EtyxGg2N8mRuIIoPRC8GYxLxuXZQ1Ol-xls2A9YCVfbF3T7Wb8FG7D7SytqmXl9GEIihcnZNlfOlIKjRs9eOcuOHSIBK5zi0P4ztyJTRE0ztuPDrJ6Cpsfyt4Buofv3VKkysOu_vd936QaWGy1MLLigpOOqv1UWXWq8jbCgkbNEWBbEXAkEyhgda8jDQxy35kTwPFDnPz7Y1-jX1tOweIN498XKBLUZ95QcCG2oiRM2pymRdPVDzij3oydewERzjdnJA4ZhcTsozP6tlWSvOBzZt6uGw-Y-Ve12SE7Q2N07-7YhQ58KbGZTlEjkw9M3YEC6D35dm880Fuz7QY1ZROisPw=w1499-h843-no?authuser=0)"
    async function fetchApi () {
      const res = await axios.get(url)
        setData(res.data)
        console.log(res.data)
    }
    fetchApi()
  }, [movieID])
  // ==== END Fetch first page ====


  // ==== Search arrow up and down logic ====
  const [cursor, setCursor] = useState(0)
  ArrowKeysReact.config({
    up: () => {
      isNaN(cursor) ? setCursor(sliceNumber) : 
      cursor < 0 ? setCursor(sliceNumber) : setCursor(prevState => prevState - 1)
    },
    down: () => {
      isNaN(cursor) ? setCursor(0) : 
      cursor > sliceNumber ? setCursor(0) : setCursor(prevState => prevState + 1)
    }
  })

  useEffect(() => {
    console.log(cursor)
  }, [cursor])

  const enterPressed = e => {
    var code = e.keyCode || e.which
    if (code === 13) { // enter key
      // zmienna kursor która œledzi który li jest podœwietlony daje nam indeks za pomoc¹ którego mo¿emy uzyskaæ id filmu z oryginalnej tablicy
      // dodanie pojawienie paska po wcisnieciu enter
      if (show){
        if (cursor === sliceNumber){
          showMore()
        } else {
          suggestionsSelected(suggestions[cursor])
          setShow(false)
          setText(oldText)
        }
      } else {
        if (cursor === sliceNumber){
          showMore()
        } else {
          setText(oldText)
          setOldText('')
        }
      setShow(true)
      console.log(show)
    }
    }
  } // ==== END Search arrow up and down logic ====
   

  // ==== Search state and functions ====
  const [suggestions, setSuggestions] = useState([])
  const [text, setText] = useState(null)
  const [queryData, setQueryData] = useState([])
  const [sliceNumber, setSliceNumber] = useState(5)
  const [oldText, setOldText] = useState('')

  const handleChange = e => {
    const value = e.target.value.replace(/[^\w\s]/gi, '') 
    setText(value)
    if (value.length === 0) { setOldText('') }
    if (value.length >= 1) {
      let url = `https://api.themoviedb.org/3/search/movie?query=%${value}&api_key=cfe422613b250f702980a3bbf9e90716`
      axios.get(url).then(response => {
        const res = (response.data.results)
        let movies = res.map(a => [a.original_title, a.id, `https://image.tmdb.org/t/p/w500${a.poster_path}`]).slice(0, sliceNumber)
        console.log(movies)
        setSuggestions(movies)
        setQueryData(response.data.results)
        setOldText(value)
      })
    } else {
      setCursor(-1)
      setTimeout(() => {  // okno sugesti z opóŸnieniem gaœnie
        setSuggestions([])
      }, 500);
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
  document.addEventListener("mousedown", handleClick);
  return () => { // return function to be called when unmounted
    document.removeEventListener("mousedown", handleClick);
  };
}, []);

const handleClick = e => {
  if (node.current.contains(e.target)) { // inside click
    setShow(true)
  } else {                               // outside click 
    setShow(false)
  }
};
// ==== END sugeston hide on clic kaway ====

  
// *** show more button ***
  const showMore = e => {
    suggestions.length > 0
    ? setSliceNumber(sliceNumber + 5)
    : console.log()
  }
  useEffect(() => {
    console.log(sliceNumber)
    let movies = queryData.map(a => [a.original_title, a.id, `https://image.tmdb.org/t/p/w500${a.poster_path}`]).slice(0, sliceNumber)
    console.log(movies)
    setSuggestions(movies)
  },[sliceNumber])
  // ==== END Search state and functions ====

  return (
    <div
      className='container-fluid w-95 h-95'
      id='app'
      {...ArrowKeysReact.events}
      tabIndex='1'
      style={{ outline: 0, }}
    >
      <div className='row'>
        <div className='col-12 col-lg-10 offset-lg-1 myContainer'>
          <Search
            handleChange={handleChange}
            suggestionsSelected={suggestionsSelected}
            text={text}
            suggestions={suggestions}
            cursor={cursor}
            setCursor={setCursor}
            enterPressed={enterPressed}
            showMore={showMore}
            sliceNumber={sliceNumber}
            oldText={oldText}
            handleClickOnInput={handleClickOnInput}
            show={show}
            node={node}
            queryData={queryData}
          />
          <Card data={data} movieID={movieID}/>
        </div>
      </div>
    </div>
  )
}
