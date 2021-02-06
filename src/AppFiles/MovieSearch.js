import { useEffect, useContext } from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import {Link, useHistory } from 'react-router-dom'
import { AppContext } from './AppContext'
import '../styles/main.scss'
import TMDBLogo from '../images/tmdb.svg'
import Scroolbar from '../Scroolbar/Scroolbar'
import no_image from '../images/no_image.png'


export default function SearchBox (props) {
  const {show, setShow, node, suggestionsSelected} = props

  const {searchbarText, setSearchbarText, oldSearchbarText, setOldSearchbarText, cursor, setCursor, suggestions, setSuggestions, queryData, setQueryData, sliceNumber, setSliceNumber, handleChange, handleClickOnInput, fetchStartPage} = useContext(AppContext)

  const gotoStarPage = () => {
    setQueryData([])
    setSearchbarText('')
    fetchStartPage()
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
  
    const enterPressed = e => {
      var code = e.keyCode || e.which
      if (code === 13) {
        // enter key
        // zmienna kursor która œledzi który li jest podœwietlony daje nam indeks za pomoc¹ którego mo¿emy uzyskaæ id filmu z oryginalnej tablicy
        // dodanie pojawienie paska po wcisnieciu enter
        if (show) {
          if (cursor === sliceNumber) {
            showMore()
          } else {
            suggestionsSelected(suggestions[cursor])
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

  // *** show more button ***
  const history = useHistory()

  const showMore = e => {
    if (sliceNumber >= 10){
      history.push("/")
      setSliceNumber(20)  // moze jakos inaczej to rozwiazaæ
    } else {
      if(suggestions.length > 0){
        setSliceNumber(sliceNumber => sliceNumber + 5)
      }
    }
  }

  useEffect(() => {
    if(queryData.length > 0){
      let movies = queryData
        .map(a => [
          a.original_title,
          a.id,
          `https://image.tmdb.org/t/p/w500${a.poster_path}`
        ])
        .slice(0, sliceNumber)
      setSuggestions(movies)
    }
  }, [sliceNumber])
  // END show more button

// ==== Podœwietlenie tekstu ====
function getHighlightedText(text, highlight, index) {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

  return <span> { parts.map((part, i) => 
    <span 
      key={i} 
      style=
      {(part.toLowerCase() === highlight.toLowerCase() && cursor !== index)
        ? { color: '#00FC87', fontWeight: 'bold' } 
        : part.toLowerCase() === highlight.toLowerCase() 
          ? { fontWeight: 'bold'}
          : {}} 
    >
        { part }
    </span>)
  } </span>;
}

const onMouseEnterHandle = e => {
  setCursor(parseInt(e.target.getAttribute('index')))
}
// ==== END Podœwietlenie tekstu ====


const renderSugestions = () => {
  if (queryData.length > 0) {
    return (
      <Scroolbar show={show} text={searchbarText}>
      <ul 
        className={(show && searchbarText) ? 'animate list' : 'list'} >
      {suggestions.map((item, index) => 
      <Link to={`/movie/${item[1]}`} className='linkStyle'>
        <li 
          className={cursor === index ? 'active tt-suggestion' : 'tt-suggestion'}
          onClick={()=> suggestionsSelected(item)}
          onMouseEnter={onMouseEnterHandle} 
          index={index}
          key={index}
        >
          <div className='row'>
            <img 
            src={item[2] !== 'https://image.tmdb.org/t/p/w500null' ? item[2] : no_image} 
            className='col-lg-2 col-md-3 col-sm-4 col-3 Image'/>
            <p className='col-lg-10 col-md-9 col-sm-8 col-9 textSugestion sugest'>
              {getHighlightedText(item[0], searchbarText, index)}
            </p>
          </div>
        </li>
      </Link>)}
        
        <li style={{visibility: queryData.length > suggestions.length ? "visible": "collapse"}}>
          <p 
            onClick={showMore} 
            index={sliceNumber}
            className={cursor === sliceNumber 
            ? 'active textSugestion showMore tt-suggestion' 
            : 'textSugestion showMore tt-suggestion'}
            >
              { sliceNumber >= 10 ? 'full screen search' 
              : suggestions.length > 0 ? 'show more' 
              : 'no result'}
          </p>
        </li>
      </ul>
      </Scroolbar>
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
    <div className='searchContainer nopadding'>
      <div className='row searchSecondContainer'>
        <div className='col-xs-12 col-sm-3 col-lg-3 p-0'>
          <Link to='/'>
            <img src={TMDBLogo} className='logo'  alt='The Movie Database' onClick={gotoStarPage}/>
          </Link>
        </div>
        
        <div className='col-xs-12 col-sm-9 col-lg-9 p-0 pl-3 searchInside' ref={node}>
          <form className='searchbox' onSubmit={e => { e.preventDefault()}}>
            <input
              onChange={handleChange}
              className='myform'
              type='text'
              placeholder='Search Movie Title...'
              value={searchbarText !== '' ? searchbarText : oldSearchbarText}
              onKeyPress={enterPressed}
              onClick={handleClickOnInput}
            />
          </form>
          {renderSugestions()}
        </div>
      </div>
    </div>
  )
}