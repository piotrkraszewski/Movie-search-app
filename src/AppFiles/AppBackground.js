import { motion, AnimatePresence } from "framer-motion"
import '../styles/main.scss'
import BgGreen2 from '../images/BgGreen2.jpg'


export default function AppBackground(props) {
  const { backgroundIMG } = props
  return (
    <>
      <div className='BgGradient'/>
      <AnimatePresence>
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{duration: 1.5}}
          
          className='BgImage'
          src={backgroundIMG ? backgroundIMG : BgGreen2}
          key={backgroundIMG}
        />
      </AnimatePresence>
    </>
  )
}