import { useContext } from 'react'
import { AppContext } from '../../../Contexts/AppContext'
import '../../../../styles/main.scss'
import { MovieSearchbarContext } from '../../../Contexts/MovieSearchbarContext'
import { NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH } from '../../../../utilities/Consts'
import HighlightTextInQuickSearchHooks from '../Hooks/HighlightTextInQuickSearchHooks'
import GotoOtherRoutesHooks from '../Hooks/GotoOtherRoutesHooks'
import no_image from '../../../../images/no_image.png'


export default function MovieSearchbarResults() {
  const { showQuickSearchRes, indexOfHighlightedMovie } = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions, allMoviesData, pushToHistory } = useContext(AppContext)

  const [highligthText, highlightMovieTextOnHover] = HighlightTextInQuickSearchHooks()
  const [selectedMovieInQuickSearch] = GotoOtherRoutesHooks()
    
  //TODO put condition in common ul. dont use 2 ul
  return (
  <>
    {allMoviesData.length > 0 //if
    ? <ul 
        className={'searchbar_ul ' + 
        (showQuickSearchRes && searchbarText && 'fadeIn')} 
      >
        {suggestions.slice(0, NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH)
        .map((item, index) => 
          <li 
            className={'searchbar_li ' + 
            (indexOfHighlightedMovie === index && 'active')}

            onClick={()=> selectedMovieInQuickSearch(item)}
            onMouseEnter={highlightMovieTextOnHover} 
            index={index}
            key={item.id}
          >
            <div className='row'>
              <img 
                src={item.poster ? item.poster : no_image} 
                className='col-lg-2 col-md-3 col-sm-4 col-3 quickSearchImage'
                alt='movie poster'
              />
              <p className='col-lg-10 col-md-9 col-sm-8 col-9'>
                {highligthText(item.title, searchbarText, index)}
              </p>
            </div>
          </li>
        )}
        
        <li className={'searchbar_li showMore ' + 
          (indexOfHighlightedMovie === NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH && 'active')}

          onMouseEnter={highlightMovieTextOnHover} 
          onClick={() => pushToHistory(`/`)} 
          index={NUM_OF_DISPLAYED_MOVIES_IN_QUICK_SEARCH}
        >
          <p>show more</p>
        </li>
      </ul>

    : //else
      searchbarText &&
        <ul className='fadeIn searchbar_ul'>
          <li className='searchbar_li showMore noResult'>no result</li>
        </ul>
    }
  </>
  )
}