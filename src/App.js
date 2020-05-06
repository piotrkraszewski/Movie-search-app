import React, { useState, useEffect } from 'react'
import Search from './Search'
import Card from './Card'
import axios from 'axios'
import './styles/css/main.css'
import ArrowKeysReact from 'arrow-keys-react'

// myKey c61f42f858306ba4c3de925ee77d581d

export default function App () {
  // ==== Fetch first page ====
  const [movieID, setMovieID] = useState(157336)
  const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
  const [data, setData] = useState({});
  
  useEffect(() => {
    async function fetchApi(){
      const res = await axios.get(url)
      setData(res.data)
    }
    fetchApi()
  }, [movieID])


  // ==== Search arrow up and down logic ====
  const [cursor, setCursor] = useState(0)
  ArrowKeysReact.config({
    up: () => {
      cursor < 0
      ? setCursor(4)
      : setCursor(cursor - 1)
    },
    down: () => {
      cursor > 4
      ? setCursor(0)
      : setCursor(cursor + 1)
    }})

    const enterPressed = e => {
      var code = e.keyCode || e.which;
      if(code === 13) { // enter key
        // zmienna kursor która œledzi który li jest podœwietlony daje nam indeks za pomoc¹ którego mo¿emy uzyskaæ id filmu z oryginalnej tablicy
        suggestionsSelected(suggestions[cursor])
      } 
    }   


  // ==== Search state and functions ====
  const [suggestions, setSuggestions] = useState([])
  const [text, setText] = useState('')

  const handleChange = e => {
    const value = e.target.value
    setText(value)
    if (value.length > 0){
      let url = `https://api.themoviedb.org/3/search/movie?query=%${value}&api_key=cfe422613b250f702980a3bbf9e90716`
      axios.get(url).then(response => {
        let res = response.data.results
        let movies = res.map(a => [a.original_title, a.id]).slice(0,5)
        console.log(movies)
        setSuggestions(movies)
      })
    } else {
      setSuggestions([])
    }
  }

  const suggestionsSelected = (value) =>{
    setText('')
    setSuggestions([])
    setMovieID(value[1])
  }
  // ==== END Search state and functions ====

  return (
      <div className="container" id='app' {...ArrowKeysReact.events} tabIndex="1">
        <div className='row'>
        <div className='col-12 col-lg-10 offset-lg-1'>
            <Search handleChange={handleChange} suggestionsSelected={suggestionsSelected} text={text} suggestions={suggestions} cursor={cursor} enterPressed={enterPressed}/>
            <Card data={data}/>
        </div>
        </div>
      </div>
  )
}