import { useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import './AppBackground.scss'


export default function AppBackground({fetchImg, fallbackImg}) {
// calucluleta size of 1% of window height and saves it to variable
// Proposal for new units to fix this 
// https://github.com/w3c/csswg-drafts/issues/4329
// Solution from Jonas Sandstedt comment 
// https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html


  useEffect(() => {
    function setDocHeight() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`)
    }
    window.addEventListener('resize', setDocHeight())
    window.addEventListener('orientationchange', setDocHeight())

    return () => {
      // functions to be called when unmounted. not shure if it does anything here
      document.removeEventListener('resize', setDocHeight)
      document.removeEventListener('orientationchange', setDocHeight)
    }
  }, [])


  return (
    <>
      <div className='BgGradient'/>
      <AnimatePresence>
        <motion.img 
          className='BgImage'
          src={fetchImg ? fetchImg : fallbackImg}
          key={fetchImg}

          initial={{ opacity: 0 }}
          animate={{ opacity: 1, delay :0.2 }}
          exit={{ opacity: 0 }}
          transition={{duration: 1.5}}
        />
      </AnimatePresence>
    </>
  )
}