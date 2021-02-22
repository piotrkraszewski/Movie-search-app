/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react'
import { AppContext } from '../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../Contexts/MovieSearchbarContext'
import '../../../styles/main.scss'
import { NOT_FOUND_POSTER_W500, NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH } from '../../../utilities/Consts'
import HighlightTextInQuickSearchHooks from './MovieSearchbarHooks/HighlightTextInQuickSearchHooks'
import ArrowKeysNavigationInQuickSearchHooks from './MovieSearchbarHooks/ArrowKeysNavigationInQuickSearchHooks'
import ShowHideQuickSearchHook from './MovieSearchbarHooks/ShowHideQuickSearchHook'
import GotoOtherRoutesHooks from './MovieSearchbarHooks/GotoOtherRoutesHooks'
import TMDBLogo from '../../../images/tmdb.svg'
import no_image from '../../../images/no_image.png'

export default function MovieSearch () {
  const { searchbarText, oldSearchbarText, suggestions, allMoviesData, handleChange, pushToHistory } = useContext(AppContext)
  const { showQuickSearchRes, indexOfHighlightedMovie } = useContext(MovieSearchbarContext)

  const [enterKeyPressedInQuickSearch] = ArrowKeysNavigationInQuickSearchHooks()
  const [node, OnMovieSearchBarClicked] = ShowHideQuickSearchHook()
  const [highligthText, highlightMovieTextOnHover] = HighlightTextInQuickSearchHooks()
  const [selectedMovieInQuickSearch, gotoStarPage] = GotoOtherRoutesHooks()


  const renderSugestions = () => {
    if (allMoviesData.length > 0) {
      return (
        <ul 
          className={(showQuickSearchRes && searchbarText) ? 'animate list' : 'list'} 
        >
        {suggestions.slice(0, NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH).map((item, index) => 
          <li 
            className={indexOfHighlightedMovie === index ? 'active tt-suggestion' : 'tt-suggestion'}
            onClick={()=> selectedMovieInQuickSearch(item)}
            onMouseEnter={highlightMovieTextOnHover} 
            index={index}
            key={index}
          >
            <div className='row'>
              <img 
                src={item[2] !== NOT_FOUND_POSTER_W500 ? item[2] : no_image} 
                className='col-lg-2 col-md-3 col-sm-4 col-3 quickSearchImage'
                alt='movie poster'
              />
              <p 
                className='col-lg-10 col-md-9 col-sm-8 col-9 textSugestion sugest'>
                {highligthText(item[0], searchbarText, index)}
              </p>
            </div>
          </li>
        )}
          
          <li>
            <p 
              onClick={() => pushToHistory(`/`)} 
              index={NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH}
              className={indexOfHighlightedMovie === NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH 
              ? 'active textSugestion showMore tt-suggestion' 
              : 'textSugestion showMore tt-suggestion'}
            >
              show more
            </p>
          </li>
        </ul>
      )
    } else {
      if (searchbarText) {
        return (
          <ul className='animate list showMore noResult'>
            <li>no result</li>
          </ul>
        )
      } 
    }
  }

  return (
    
    <div className='searchContainer'>
      <div className='row searchSecondContainer'>
        <div className='col-xs-12 col-sm-3 col-lg-3 p-0'>
          <img 
            src={TMDBLogo} 
            className='logo'
            alt='The Movie Database' 
            onClick={gotoStarPage}
          />
        </div>
        
        <div className='col-xs-12 col-sm-9 col-lg-9 p-0 pl-3 searchInside' ref={node}>
          <form className='searchbox' onSubmit={e => e.preventDefault()}>
            <input
              onChange={handleChange}
              className='movieSearchBar'
              type='text'
              placeholder='Search Movie Title...'
              value={searchbarText !== '' ? searchbarText : oldSearchbarText}
              onKeyPress={enterKeyPressedInQuickSearch}
              onClick={OnMovieSearchBarClicked}
            />
          </form>
          {renderSugestions()}
        </div>
      </div>
    </div>
  )
}