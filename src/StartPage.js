import StartPageCard from './StartPageCard'
import StartPageSearch from './StartPageSearch'


export default function StartPage(props) {
  const {text, oldText, handleSearchChange, handleClickOnInput, suggestions, setMovieID, change, startPageSuggestions} = props

  const suggestionsSelectedFullscreen = value => {
    setMovieID(value[1])
  }

  return (
    <div>
      <StartPageSearch {...{text, oldText, handleSearchChange, handleClickOnInput}}/>
      <StartPageCard {...{text, oldText, suggestions, suggestionsSelectedFullscreen, change, startPageSuggestions}} />
    </div>
  )
}
