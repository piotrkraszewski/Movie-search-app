import axios from 'axios'
const API_KEY = 'api_key=cfe422613b250f702980a3bbf9e90716'
const BASE_API_URL = 'https://api.themoviedb.org'
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/'


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
    `${BASE_IMG_URL}w500${movie.poster_path}`,
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

