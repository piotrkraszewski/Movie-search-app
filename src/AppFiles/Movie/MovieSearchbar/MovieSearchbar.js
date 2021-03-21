/* eslint-disable react-hooks/exhaustive-deps */
import '../../../styles/main.scss'
import KeysPressedInSearchbarHooks from './Hooks/KeysPressedInSearchbarHooks'
import ShowHideQuickSearchHook from './Hooks/ShowHideQuickSearchHook'
import GotoOtherRoutesHooks from './Hooks/GotoOtherRoutesHooks'
import MovieSearchbarResults from './Results/MovieSearchbarResultsPC'
import TMDBLogo from '../../../images/tmdb.svg'
import Searchbar from '../MovieSearchbar/Hooks/Searchbar'

export default function MovieSearch () {
  const enterKeyInSearchbar = KeysPressedInSearchbarHooks()
  const {node, OnSearchBarClicked} = ShowHideQuickSearchHook()
  const {gotoStarPage} = GotoOtherRoutesHooks()


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