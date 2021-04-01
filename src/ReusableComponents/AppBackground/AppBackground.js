import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import './AppBackground.scss'


export default function AppBackground({fetchImg, fallbackImg}) {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", listener)

    return () => {
      window.removeEventListener("resize", listener)
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

          width={width}
          height={height}

          initial={{ opacity: 0 }}
          animate={{ opacity: 1, delay :0.2 }}
          exit={{ opacity: 0 }}
          transition={{duration: 1.5}}
        />
      </AnimatePresence>
    </>
  )
}