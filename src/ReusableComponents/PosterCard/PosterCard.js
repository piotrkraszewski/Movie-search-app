import { motion, AnimatePresence } from "framer-motion"
import './PosterCard.scss'
import ImageFadeIn from "react-image-fade-in";
import no_image from 'Images/no_image.png'
import PropTypes from 'prop-types'

PosterCard.propTypes = {
  cardData: PropTypes.object, 
  onClick: PropTypes.func, 
  className: PropTypes.string, 
  cardTransitionDuration: PropTypes.number, 
  imgTransition: PropTypes.number, 
  imgHeight: PropTypes.string, 
  imgWidth: PropTypes.string
}

export default function PosterCard ({
  cardData, onClick, className, cardTransitionDuration, imgTransition, imgHeight, imgWidth}) {
 
  return (
  <AnimatePresence exitBeforeEnter>
    <motion.div
      id='PosterCard'
      className={`${className}`}
      onClick={() => onClick(cardData.id)}

      key={cardData.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: cardTransitionDuration, ease: 'easeInOut' }}
    >
      <div >
          <ImageFadeIn
            width={imgWidth}
            height={imgHeight}
            opacityTransition={imgTransition}
            src={cardData.poster ? cardData.poster : no_image}
            alt={`poster ${cardData.id}`}
          />
        <p>{cardData.title}</p>
      </div>
    </motion.div>
  </AnimatePresence>
  )
}