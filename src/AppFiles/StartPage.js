import StartPageCard from './StartPageCard'
import StartPageSearch from './StartPageSearch'


export default function StartPage(props) {
  const {searchbarText, oldSearchbarText, handleChange, handleClickOnInput, suggestions, setMovieID} = props

  const suggestionsSelectedFullscreen = value => {
    setMovieID(value[1])
  }

  return (
    <div>
      <StartPageSearch {...{searchbarText, oldSearchbarText, handleChange, handleClickOnInput}}/>
      <StartPageCard {...{searchbarText, suggestions, suggestionsSelectedFullscreen}}/>
    </div>
  )
}
