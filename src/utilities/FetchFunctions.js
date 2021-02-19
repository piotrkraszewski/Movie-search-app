import axios from 'axios'
import { API_KEY, BASE_API_URL, POSTER_W500 } from '../utilities/Constans'


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

  return allMoviesData.map(movie => [
    movie.original_title,
    movie.id,
    POSTER_W500 + movie.poster_path
  ])
}

export async function getAllMoviesData(url){
  const response = await axios.get(url)
  console.log(typeof response)
  return response.data.results
}


//==== Fetch one movie ====
export async function getMovieData(movieID){
  const response = await axios.get(`${BASE_API_URL}/3/movie/${movieID}?&${API_KEY}`)
  return response.data
}

