import StartPageCard from './StartPageCard'
import StartPageSearch from './StartPageSearch'
import { motion } from "framer-motion"
import Scroolbar from '../Scroolbar/MovieSearchScroolbar'

export default function StartPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    > 
    {/* <Scroolbar show={true} text={true}> */}
      <StartPageSearch />
      <StartPageCard />
      {/* </Scroolbar> */}
    </motion.div> 
  )
}