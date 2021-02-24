/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react'
import { AppContext } from '../../Contexts/AppContext'
import '../../../styles/main.scss'
import ArrowKeysNavigationInQuickSearchHooks from './MovieSearchbarHooks/ArrowKeysNavigationInQuickSearchHooks'
import ShowHideQuickSearchHook from './MovieSearchbarHooks/ShowHideQuickSearchHook'
import GotoOtherRoutesHooks from './MovieSearchbarHooks/GotoOtherRoutesHooks'
import MovieSearchbarResults from './MovieSearchbarResults'
import TMDBLogo from '../../../images/tmdb.svg'

export default function MovieSearch () {
  const { searchbarText, oldSearchbarText, onSearchbarTextChanging } = useContext(AppContext)
  
  const [enterKeyPressedInQuickSearch] = ArrowKeysNavigationInQuickSearchHooks()
  const [node, OnMovieSearchBarClicked] = ShowHideQuickSearchHook()
  const [gotoStarPage] = GotoOtherRoutesHooks()


  return (
    <div className='searchContainer'>
      <div className='row searchSecondContainer'>
        <div className='col-xs-12 col-sm-3 col-lg-3 p-0'>
          <img 
            src={TMDBLogo} 
            className='logo'
            alt='The Movie Database Logo' 
            onClick={gotoStarPage}
          />
        </div>
        
        <div className='col-xs-12 col-sm-9 col-lg-9 p-0 pl-3 searchInside' ref={node}>
          <form className='searchbox' onSubmit={e => e.preventDefault()}>
            <input
              onChange={onSearchbarTextChanging}
              className='movieSearchBar'
              type='text'
              placeholder='Search Movie Title...'
              value={searchbarText !== '' ? searchbarText : oldSearchbarText}
              onKeyPress={enterKeyPressedInQuickSearch}
              onClick={OnMovieSearchBarClicked}
            />
          </form>
          <MovieSearchbarResults/>
        </div>
      </div>
    </div>
  )
}