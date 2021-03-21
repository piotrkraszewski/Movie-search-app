import { useContext } from 'react'
import { AppContext } from '../../../Contexts/AppContext'
import '../../../../styles/main.scss'
import { MovieSearchbarContext } from '../../../Contexts/MovieSearchbarContext'
import { NUM_OF_DISP_SUGGESTIONS_MOBILE } from '../../../../utilities/Consts'
import GotoOtherRoutesHooks from '../Hooks/GotoOtherRoutesHooks'
import no_image from '../../../../images/no_image.png'


export default function MovieSearchbarResults() {
  const { showQuickSearchRes } = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions, pushToHistory } = useContext(AppContext)
  const {selectedMovieInQuickSearch} = GotoOtherRoutesHooks()

  return (
  <div className='searchBarResMobile'>
    <div
      className={'searchbar_div ' + 
      (showQuickSearchRes && searchbarText && 'fadeIn')} 
    >
      {suggestions.length > 0 //if
      ? //true,  have to return one big fragment <>
      <>  
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

        {<li className={'searchbar_li showMore'}
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
    </div>
  </div>
  )
}