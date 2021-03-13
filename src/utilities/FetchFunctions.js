import axios from 'axios'
import { API_KEY, BASE_API_URL, POSTER_W500 } from './Consts'
import { getMovieIdFromLocationPathname } from './RoutesFunctions'


//==== Fetch all movies ====
export async function getMoviesDataToDisplayInSearch(input){
  let allMoviesData
  if (typeof input === 'string'){  // if url
    allMoviesData = await getAllMoviesData(input)
  } else if (typeof input === 'object'){
    allMoviesData = input
  } else {
    console.error(`Passed ${typeof input} input to getMoviesDataToDisplayInSearch. You must pass string or object`)
    return 
  }

  return allMoviesData.map(movie => ({
    title: movie.original_title,
    id: movie.id,
    // poster: POSTER_W500 + movie.poster_path
    poster: movie.poster_path !== null ? POSTER_W500 + movie.poster_path : null
  }))
}

export async function getAllMoviesData(url){
  const response = await axios.get(url)
  return response.data.results
}

export function createSearchMoviesUrl(value){
  return `${BASE_API_URL}/3/search/movie?query=%${value}&${API_KEY}`
}

//==== Fetch one movie ====
export async function getMovieData(movieID){
  const response = await axios.get(`${BASE_API_URL}/3/movie/${movieID}?&${API_KEY}`)
  return response.data
}

export function setInitMovieID(location){
  const initMovieID = getMovieIdFromLocationPathname(location)
  if(initMovieID === '') return '157336' // interstellar
  return initMovieID
}