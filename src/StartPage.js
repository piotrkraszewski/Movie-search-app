import React from 'react'
import StartPageCard from './StartPageCard'
import StartPageSearch from './StartPageSearch'


export default function StartPage(props) {
  const {text, oldText, handleChange, handleClickOnInput, node, suggestions, suggestionsSelected} = props

  return (
    <div>
      <StartPageSearch {...{text, oldText, handleChange, handleClickOnInput, node}}/>
      <StartPageCard {...{suggestions, suggestionsSelected}} />
    </div>
  )
}
