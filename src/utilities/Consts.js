export const API_KEY = 'api_key=cfe422613b250f702980a3bbf9e90716'
export const BASE_API_URL = 'https://api.themoviedb.org'
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/'
export const INIT_BG_IMG = 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg' // interstellar

export const POSTER_W500 = `${BASE_IMG_URL}w500`
export const NOT_FOUND_POSTER_W500 = `${POSTER_W500}null`
export const NOT_FOUND_BG_IMG = `${BASE_IMG_URL}originalnull`


export const POPULAR_MOVIES_URL = `${BASE_API_URL}/3/movie/popular?${API_KEY}` 


export const NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH = 5