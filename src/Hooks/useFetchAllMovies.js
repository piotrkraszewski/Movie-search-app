import useFetch from 'Hooks/useFetch'
import { POSTER_W500 } from './Consts'


export default function GetMoviesDataToDisplayInSearch(input){
  const fetchObj = useFetch(input)
  

  const dataToDisplay = fetchObj.data.map(movie => ({
    title: movie.original_title,
    id: movie.id,
    poster: movie.poster_path !== null ? POSTER_W500 + movie.poster_path : null
  }))


  return {
    dataToDisplay: dataToDisplay,
    allMoviesData: fetchObj.data,
    loading: fetchObj.loading,
    error: fetchObj.error
  }
}