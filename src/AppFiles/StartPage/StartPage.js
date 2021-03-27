import StartPageCard from './StartPageCards'
import StartPageSearch from './StartPageSearchbar'
import { motion } from "framer-motion"

export default function StartPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay :0.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    > 
      <StartPageSearch />
      <StartPageCard />
    </motion.div> 
  )
}