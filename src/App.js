import React, { useState, useEffect, useRef } from 'react'
import Search from './Search'
import Card from './Card'
// import FullscreenSearch from './FullscreenSearch'
import axios from 'axios'
import './styles/main.scss'
import ArrowKeysReact from 'arrow-keys-react'
import numeral from 'numeral'

// myKey c61f42f858306ba4c3de925ee77d581d

export default function App () {
  // ==== Fetch first page ====
  const [movieID, setMovieID] = useState(157336)
  const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
  const [data, setData] = useState({})

  useEffect(() => {
    document.body.style.backgroundImage = "url(https://wallpaperaccess.com/full/670449.jpg)"
    async function fetchApi () {
      const res = await axios.get(url)
        setData(res.data)
        console.log(res.data)
    }
    fetchApi()
  }, [movieID])
  // ==== END Fetch first page ====

  // ==== CARD COMPONENT LOGIC ====
  function nestedDataToString(nestedData) {
    let nestedArray = [],
        resultString;
    if(nestedData !== undefined){
      nestedData.forEach(function(item){
        nestedArray.push(item.name);
      });
    }
    resultString = nestedArray.join(', '); // array to string
    return resultString;
  }

let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster_path,
    production = data.production_companies,
    productionCountries = data.production_countries,
    genres = data.genres,
    totalRevenue = data.revenue,
    productionList = nestedDataToString(production),
    productionCountriesList = nestedDataToString(productionCountries),
    noData = '-',
    genresList = nestedDataToString(genres),
    backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop_path


  // conditional statements for no data
  if (data.vote_average === 'undefined' || data.vote_average === 0) {
    data.vote_average = noData
  }

  // dodaje $ i przecinki
  if (totalRevenue === 'undefined' || totalRevenue === 0) {
    totalRevenue = noData
  } else {
    totalRevenue = numeral(data.revenue).format('($0,0)');
  }

  if(data.poster_path== null){
    posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g'
  }

  if(data.backdrop_path == null){
    backdropIMG = 'https://wallpaperaccess.com/full/670449.jpg'
  }

  useEffect(() => {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')'
  })

  // ==== END CARD LOGIC ====

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
      // zmienna kursor kt�ra �ledzi kt�ry li jest pod�wietlony daje nam indeks za pomoc� kt�rego mo�emy uzyska� id filmu z oryginalnej tablicy
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
      setTimeout(() => {  // okno sugesti z op�nieniem ga�nie
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
    sliceNumber >= 10 ? console.log('full screen search clicked')
    : suggestions.length > 0
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
          <Card data={data} movieID={movieID} nestedDataToString={nestedDataToString} genresList={genresList} productionList={productionList} totalRevenue={totalRevenue} posterIMG={posterIMG}/>
          {/* <FullscreenSearch data={data} movieID={movieID}/> */}
        </div>
      </div>
    </div>
  )
}
