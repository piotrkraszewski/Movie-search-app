export function highligthText(text, highlight, index, cursor) {
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

