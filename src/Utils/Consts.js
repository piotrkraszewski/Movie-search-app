//Basics
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY
export const BASE_API_URL = 'https://api.themoviedb.org'
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/'
export const BASE_BG_IMG_URL = 'https://image.tmdb.org/t/p/original'
export const INIT_BG_IMG = 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg' // interstellar

// Commbinations of basics
export const POSTER_W500 = `${BASE_IMG_URL}w500`
export const POPULAR_MOVIES_URL = `${BASE_API_URL}/3/movie/popular?${API_KEY}`

// Number of dysplayed results
export const NUM_OF_DISP_RES_PC = 5
export const NUM_OF_DISP_RES_MOBILE = 3

// Transitions
export const PAGE_TRANSITION_TIME = 0.55
export const START_PAGE_CARDS_TRANSITION = 0.35
export const QUICK_SEARCH_TRANSITION = 0.35

// Routes
export const HOME_PAGE = '/'
export const MOVIE_PAGE = '/movie/'
export const LOGIN_PAGE = '/login'
export const REGISTER_PAGE = '/register'
export const FORGOT_PASSWORD = '/forgot-password'
export const PROFILE_PAGE = '/profile'
export const UPDATE_PROFILE = '/profile-update'

//Movie status
export const WATCHING = 'Watching'
export const PLAN_TO_WATCH = 'Plan to watch'
export const COMPLETED = 'Completed'
export const PAUSED = 'Paused'
export const DROPPED = 'Dropped'
export const DELET_MOVIE_DATA = 'Delete movie data'
export const NO_RATING = 'no rating'

export const STATUS_OPTIONS = [WATCHING, PLAN_TO_WATCH, COMPLETED, PAUSED, DROPPED]

//Sort by
export const RATING = 'Rating'
export const TITLE = 'Title'
export const MODIFIED = 'Modified'
export const ADDED = 'Added'

//Order by
export const ASC = 'asc'
export const DESC = 'desc'