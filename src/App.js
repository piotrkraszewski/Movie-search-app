import React, { useState, useEffect } from 'react'
import Search from './Search'
import Card from './Card'
import axios from 'axios'
import $ from 'jquery'
import * as Bloodhound from 'bloodhound-js'
import './styles/css/main.css'

// myKey c61f42f858306ba4c3de925ee77d581d

export default function App () {
  const [movieID, setMovieID] = useState(157336)
  const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
  
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchApi(){
      const res = await axios.get(url)
      setData(res.data)
      console.log(res.data)
    }
    fetchApi()
  }, [movieID])


  return (
      <div className="container" id='app'>
        <div className='row'>
        <div className='col-12 col-lg-10 offset-lg-1'>
            <Search />
            <Card data={data}/>
        </div>
        </div>
        
      </div>
  )
}