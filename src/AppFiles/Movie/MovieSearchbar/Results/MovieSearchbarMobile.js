import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import NoResult from 'ReusableComponents/NoResult/NoResult'
import ResultsMobile from './MovieSearchbarMobileResults'
import SearchbarResultsTransitionWraper from 'ReusableComponents/SearchbarResultsTransitionWraper'


export default function MovieSearchbarMobile() {
  const { showNoResults, showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions } = useContext(AppContext)


  return (
  <div className='searchBarResMobile'>
    <SearchbarResultsTransitionWraper render={() => 
      <>
        {suggestions.length > 0 && showQuickSearchRes
        ? <ResultsMobile/>
        : <NoResult 
            className='searchbar_container'
            fadeInConditionsArr={[showQuickSearchRes, searchbarText, showNoResults]}
            onClose={setShowQuickSearchRes}
            closeBtn={'btn'}
          />
        }
      </>
    }/>
  </div>
  )
}