import { useContext } from 'react'
import 'styles/main.scss'
import { Link } from 'react-router-dom'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { motion, AnimatePresence } from "framer-motion"
import no_image from 'images/no_image.png'


export default function FullscreenSearch() {
  const {searchbarText, suggestions, dispPostersNum } = useContext(AppContext)

  return (
    <div className='StartPageCards'>

    <div className='Container'>
      <p className='title'>
        {!searchbarText && 'Trending Now'}
      </p>
      
      <div className='row'>
        {
        suggestions.slice(0, dispPostersNum).map((item) => 
        <AnimatePresence exitBeforeEnter>
          <motion.div 
            className='smallCard col-xl-2 col-md-3 col-4' 
            key={item.id}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/movie/${item.id}`} className='linkStyle'>
              <div>
                <img 
                  loading='lazy'
                  src={item.poster ? item.poster : no_image}
                  alt={`poster ${item.id}`}
                />
                <p>{item.title}</p>
              </div>
            </Link>
          </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>

  </div>
  )
}