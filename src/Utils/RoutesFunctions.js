export const getCurrentPageUrl = location => (
  location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1)
)

export const getMovieIdFromLocationPathname = location => (
  location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
)