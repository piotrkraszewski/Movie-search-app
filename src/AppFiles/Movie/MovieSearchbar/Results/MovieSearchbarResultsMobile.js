import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import { NUM_OF_DISP_SUGGESTIONS_MOBILE } from 'utilities/Consts'
import GotoOtherRoutesHooks from '../Hooks/GotoOtherRoutesHooks'
import no_image from 'images/no_image.png'


export default function MovieSearchbarResults() {
  const { showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions, pushToHistory } = useContext(AppContext)
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()

  return (
  <div className='searchBarResMobile'>
    <div
      className={'searchbar_container ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      {suggestions.length > 0 //if
      ? //true,  have to return one big fragment <>
      <>  
      <div className='searchbar_div'>
        {suggestions.slice(0, NUM_OF_DISP_SUGGESTIONS_MOBILE)
        .map((item) => 
        <div 
          className='smallCard col-xl-2 col-md-3 col-4' 
          key={item.id}
          onClick={() => selectedMovieInQuickSearch(item.id)}
        >
          <div>
            <img 
              src={item.poster ? item.poster : no_image}
              alt={`poster ${item.id}`}
            />
            <p>{item.title}</p>
          </div>
        </div>
        )}
      </div>

        {<div className='searchbar_li'>
          <p 
            className='showMoreBtn'
            onClick={() => pushToHistory(`/`)} 
            index={NUM_OF_DISP_SUGGESTIONS_MOBILE}
          >
            show more
          </p>
          <p 
            className='showMoreClose'
            onClick={() => setShowQuickSearchRes(false)}
          >
            close
          </p>
        </div>}
      </>

      : //else
        searchbarText &&
        <li className='searchbar_li showMore noResult'>no result</li>
      }
    </div>
  </div>
  )
}