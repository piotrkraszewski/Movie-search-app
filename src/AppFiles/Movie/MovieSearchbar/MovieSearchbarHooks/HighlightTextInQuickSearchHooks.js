import { useContext } from 'react'
import { MovieSearchbarContext } from '../../../Contexts/MovieSearchbarContext'


export default function HighlightTextInQuickSearchHooks() {
  const { cursor, setCursor } = useContext(MovieSearchbarContext)

  function highligthText(text, highlight, index) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

    return <span> { parts.map((part, i) => 
      <span 
        key={i} 
        style=
        {(part.toLowerCase() === highlight.toLowerCase() && cursor !== index)
          ? { color: '#00FC87', fontWeight: 'bold' } 
          : part.toLowerCase() === highlight.toLowerCase() 
            ? { fontWeight: 'bold'}
            : {}} 
      >
        { part }
      </span>)
    } </span>;
  }

  const highlightMovieTextOnHover = e => {
    setCursor(parseInt(e.target.getAttribute('index')))
  }

  return [highligthText, highlightMovieTextOnHover]
}