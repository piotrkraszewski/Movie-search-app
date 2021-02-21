/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import { Link, useHistory } from 'react-router-dom'
import { AppContext } from '../../Contexts/AppContext'
import { MovieSearchbarContext } from '../../Contexts/MovieSearchbarContext'
import '../../../styles/main.scss'
import { NOT_FOUND_POSTER_W500 } from '../../../utilities/Consts'
import { highligthText } from './MovieSearchbarFunctions'
import MovieSearchbarHooks from './MovieSearchbarHooks'
import ShowHideQuickSearchMoviesHooks from './ShowHideQuickSearchMoviesHooks'
import TMDBLogo from '../../../images/tmdb.svg'
import no_image from '../../../images/no_image.png'

const sliceNumber = 5

export default function MovieSearch () {
  const { searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, suggestions, allMoviesData,  setAllMoviesData, handleChange, fetchPopularMoviesOnStartPage } = useContext(AppContext)
  const { show, setShow } = useContext(MovieSearchbarContext)

  const [cursor, setCursor] = useState()
  
  // *** show more button ***
  const history = useHistory()
  const showMore = e => history.push(`/`)


  const [selectedMovieInQuickSearch] = MovieSearchbarHooks()
  const [node, OnMovieSearchBarClicked] = ShowHideQuickSearchMoviesHooks()
  

  const gotoStarPage = () => {
    setAllMoviesData([])
    setSearchbarText('')
    fetchPopularMoviesOnStartPage()
    showMore()
  }


    // ==== Search arrow up and down logic ====
    
    ArrowKeysReact.config({
      up: () => {
        isNaN(cursor)
          ? setCursor(sliceNumber)
          : cursor < 0
          ? setCursor(sliceNumber)
          : setCursor(prevState => prevState - 1)
      },
      down: () => {
        isNaN(cursor)
          ? setCursor(0)
          : cursor > sliceNumber
          ? setCursor(0)
          : setCursor(prevState => prevState + 1)
      }
    })
  
    const enterPressed = (e) => {
      const code = e.keyCode || e.which
      if (code === 13) {
        // enter key
        // zmienna kursor która œledzi który li jest podœwietlony daje nam indeks za pomoc¹ którego mo¿emy uzyskaæ id filmu z oryginalnej tablicy
        // dodanie pojawienie paska po wcisnieciu enter
        if (show) {
          if (cursor === sliceNumber) {
            showMore()
          } else {
            selectedMovieInQuickSearch(suggestions[cursor])
            setShow(false)
            setSearchbarText(oldSearchbarText)
          }
        } else {
          if (cursor === sliceNumber) {
            showMore()
          } else {
            setSearchbarText(oldSearchbarText)
            setOldSearchbarText('')
          }
          setShow(true)
        }
      }
    } // ==== END Search arrow up and down logic ====
  


// ==== Podœwietlenie tekstu ====
const highlightMovieTextOnHover = e => {
  setCursor(parseInt(e.target.getAttribute('index')))
}
// ==== END Podœwietlenie tekstu ====


const renderSugestions = () => {
  if (allMoviesData.length > 0) {
    return (
      <ul 
        className={(show && searchbarText) ? 'animate list' : 'list'} 
      >
      {suggestions.slice(0, sliceNumber).map((item, index) => 
      <Link to={`/movie/${item[1]}`} className='linkStyle'>
        <li 
          className={cursor === index ? 'active tt-suggestion' : 'tt-suggestion'}
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
              {highligthText(item[0], searchbarText, index, cursor)}
            </p>
          </div>
        </li>
      </Link>)}
        
        <li>
          <p 
            onClick={showMore} 
            index={sliceNumber}
            className={cursor === sliceNumber 
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
              onKeyPress={enterPressed}
              onClick={OnMovieSearchBarClicked}
            />
          </form>
          {renderSugestions()}
        </div>
      </div>
    </div>
  )
}