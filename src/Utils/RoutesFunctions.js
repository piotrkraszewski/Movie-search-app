export const getMovieIdFromLocationPathname = location => {
  if(location.pathname.includes('/movie/'))
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
}