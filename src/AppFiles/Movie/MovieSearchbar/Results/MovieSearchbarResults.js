import { useContext } from 'react'
import 'styles/main.scss'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { MovieSearchbarContext } from 'AppFiles/Contexts/MovieSearchbarContext'
import NoResult from 'ReusableComponents/NoResult/NoResult'
import ResultsMobile from './ResultsMobile'
import ResultsPC from './ResultsPC'
import useDelayShowNoResults from 'Hooks/SearchbarHooks/useDelayShowNoResults'
import useSearchbarResultsTransition from 'Hooks/SearchbarHooks/useSearchbarResultsTransition'
import { isMobile } from "react-device-detect"


export default function MovieSearchbarResults() {
  const { showQuickSearchRes, setShowQuickSearchRes} = useContext(MovieSearchbarContext)
  const { searchbarText, suggestions } = useContext(AppContext)

  const showNoResults = useDelayShowNoResults(1000, searchbarText)
  
  return (
  <div className='searchBarResMobile'>
    {useSearchbarResultsTransition(
      <>
        {suggestions.length > 0 && showQuickSearchRes
        ? isMobile ? <ResultsMobile/> : <ResultsPC/>
        : <NoResult 
            className={isMobile ? 'searchbar_container' : 'searchbar_ul'}
            fadeInConditionsArr={[showQuickSearchRes, searchbarText, showNoResults]}
            onClose={setShowQuickSearchRes}
            closeBtn={isMobile ? 'btn' : 'img'}
          />
        }
      </>
    )}
  </div>
  )
}