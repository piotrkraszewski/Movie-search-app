import axios from 'axios'

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/'


// export async function fetchSearchResults(url){
//   const allMoviesData = getAllMoviesData(url)
//   const dataToDisplay = displayMoviesInSearch(allMoviesData)
//   return [dataToDisplay, allMoviesData]
// } 

export async function getAllMoviesData(url){
  const response = await axios.get(url)
  console.log(typeof response)
  return response.data.results
}


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



