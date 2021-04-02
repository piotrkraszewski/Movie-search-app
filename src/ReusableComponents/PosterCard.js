import { motion, AnimatePresence } from "framer-motion"
import ImageFadeIn from "react-image-fade-in";
import no_image from 'Images/no_image.png'


export default function StartPageCard ({
  cardData, onClick, className, cardTransitionDuration, imgTransition, imgHeight, imgWidth}) {
 
  return (
  <AnimatePresence exitBeforeEnter>
    <motion.div
      className={className}
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