import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import NoResult from 'ReusableComponents/NoResult/NoResult'
import ResultsMobile from './MovieSearchbarMobileResults'
import useDelayShowNoResults from 'Hooks/SearchbarHooks/useDelayShowNoResults'
import useSearchbarResultsTransition from 'Hooks/SearchbarHooks/useSearchbarResultsTransition'


export default function MovieSearchbarMobile() {
  const { showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions } = useContext(AppContext)

  const showNoResults = useDelayShowNoResults(1000, searchbarText)
  
  return (
  <div className='searchBarResMobile'>
    {useSearchbarResultsTransition(
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
    )}
  </div>
  )
}