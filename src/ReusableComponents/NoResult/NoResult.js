import {useState, useEffect} from 'react'
import s from './NoResult.module.scss'
import c from 'styles/helpers/classes.module.sass'
import PropTypes from 'prop-types'
import closeImg  from 'Images/close.svg'


NoResult.propTypes = {
  className: PropTypes.string,
  fadeInConditionsArr: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  closeBtn: PropTypes.string.isRequired
}

export default function NoResult({className, fadeInConditionsArr, onClose, closeBtn}) {
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    // if every element in array is true
    setFadeIn(fadeInConditionsArr.every(item => item))
  }, [fadeInConditionsArr])

  return (
    <div className={`${s.NoResult} ${className} ` + (fadeIn && c.fadeIn)}>
        <p>no result</p>

        {closeBtn === 'btn' &&
          <p
            className={s.btn}
            onClick={() => onClose(false)}
          >close</p>
        }

        {closeBtn === 'img' &&
          <img
            src={closeImg}
            onClick={() => onClose(false)}
            alt="close search results"
          />
        }
    </div>
  )
}