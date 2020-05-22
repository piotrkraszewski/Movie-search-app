import React from 'react'
import StartPageCard from './StartPageCard'
import StartPageSearch from './StartPageSearch'


export default function StartPage(props) {
  const {text, oldText, handleChange, handleClickOnInput, suggestions, setMovieID} = props

  const suggestionsSelectedFullscreen = value => {
    setMovieID(value[1])
  }

  return (
    <div>
      <StartPageSearch {...{text, oldText, handleChange, handleClickOnInput}}/>
      <StartPageCard {...{text, suggestions, suggestionsSelectedFullscreen}} />
    </div>
  )
}
