import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import NoResult from 'ReusableComponents/NoResult/NoResult'
import MovieSearchbarPCResults from './MovieSearchbarPCResults'
import SearchbarResultsTransitionWraper from 'ReusableComponents/SearchbarResultsTransitionWraper'
import useDelayShowNoResults from 'Hooks/SearchbarHooks/useDelayShowNoResults'

export default function MovieSearchbarPC() {
  const { showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions } = useContext(AppContext)

  const showNoResults = useDelayShowNoResults(1000, searchbarText)

  
  return (
  <div className='searchBarResPC'>
    <SearchbarResultsTransitionWraper render={() => 
      <>
        {suggestions.length > 0 && showQuickSearchRes
        ? <MovieSearchbarPCResults/>
        : <NoResult 
            className='searchbar_ul'
            fadeInConditionsArr={[showQuickSearchRes, searchbarText, showNoResults]}
            onClose={setShowQuickSearchRes}
            closeBtn={'img'}
          />
        }
      </>
    }/>
  </div>
  )
}