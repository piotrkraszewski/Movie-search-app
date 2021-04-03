import {useState, useEffect} from 'react'
import closeImg  from 'Images/close.svg'


export default function NoResult({className, fadeInConditionsArr, onClose, closeBtn}) {
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    // if every element in array is true
    setFadeIn(fadeInConditionsArr.every(item => item))
  }, [fadeInConditionsArr])

  return (
    <div className={`noResult ${className} ` + (fadeIn && 'fadeIn')}>
        <p>no result</p>

        {closeBtn === 'btn' &&
          <p 
            className='btn'
            onClick={() => onClose(false)}
          >close</p>
        }

        {closeBtn === 'img' &&
          <img 
            className='closeImg'
            src={closeImg} 
            onClick={() => onClose(false)}
            alt="close search results"
          />
        }
    </div>
  )
}