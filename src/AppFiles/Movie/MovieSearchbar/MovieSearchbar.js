import 'styles/main.scss'
import useKeysPressedInSearchbar from 'Hooks/SearchbarHooks/useKeysPressedInSearchbar'
import useShowHideQuickSearch from 'Hooks/SearchbarHooks/useShowHideQuickSearch'
import useGotoOtherRoutes from 'Hooks/SearchbarHooks/useGotoOtherRoutes'
import MovieSearchbarResults from './Results/MovieSearchbarResults'
import TMDBLogo from 'Images/tmdb.svg'
import Searchbar from 'ReusableComponents/Searchbar/Searchbar'


export default function MovieSearchbar() {
  const enterKeyInSearchbar = useKeysPressedInSearchbar()
  const {node, OnSearchBarClicked} = useShowHideQuickSearch()
  const {gotoStarPage} = useGotoOtherRoutes()

  return (
    <div className='movieSearchBar'>
      <div className='row Container'>
        <div className='col-xs-12 col-sm-3 col-lg-3 p-0'>
          <img 
            src={TMDBLogo} 
            className='logo'
            alt='The Movie Database Logo' 
            onClick={gotoStarPage}
          />
        </div>
        
        <div className='col-xs-12 col-sm-9 col-lg-9 p-0' ref={node}>
          <Searchbar 
            onClick={OnSearchBarClicked} 
            onKeyPress={enterKeyInSearchbar}
          />
          <MovieSearchbarResults/> 
        </div>
      </div>
    </div>
  )
}