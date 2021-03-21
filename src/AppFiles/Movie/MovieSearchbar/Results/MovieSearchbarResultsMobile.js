import { useContext } from 'react'
import { AppContext } from '../../../Contexts/AppContext'
import '../../../../styles/main.scss'
import { MovieSearchbarContext } from '../../../Contexts/MovieSearchbarContext'
import { NUM_OF_DISP_SUGGESTIONS_MOBILE } from '../../../../utilities/Consts'
import HighlightTextInQuickSearchHooks from '../Hooks/HighlightTextInQuickSearchHooks'
import GotoOtherRoutesHooks from '../Hooks/GotoOtherRoutesHooks'
import no_image from '../../../../images/no_image.png'


export default function MovieSearchbarResults() {
  const { showQuickSearchRes, indexOfHighlightedMovie } = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions, pushToHistory } = useContext(AppContext)

  const {highligthText, highlightMovieTextOnHover} = HighlightTextInQuickSearchHooks()
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()


  return (
    <ul 
      className={'searchbar_ul ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      {suggestions.length > 0 //if
      ? //true,  have to return one big fragment <>
      <>  
        {suggestions.slice(0, 3)
        .map((item, index) => 
          <li 
            className={'searchbar_li ' + 
            (indexOfHighlightedMovie === index && 'active')}

            onClick={()=> selectedMovieInQuickSearch(item.id)}
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

        {<li className={'searchbar_li showMore ' + 
          (indexOfHighlightedMovie === NUM_OF_DISP_SUGGESTIONS_MOBILE && 'active')}

          onMouseEnter={highlightMovieTextOnHover} 
          onClick={() => pushToHistory(`/`)} 
          index={NUM_OF_DISP_SUGGESTIONS_MOBILE}
        >
          <p>show more</p>
        </li>}
      </>

      : //else
        searchbarText &&
        <li className='searchbar_li showMore noResult'>no result</li>
      }
    </ul>
  )
}