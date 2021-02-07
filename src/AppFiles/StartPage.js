import StartPageCard from './StartPageCard'
import StartPageSearch from './StartPageSearch'
import { motion, AnimatePresence } from "framer-motion"

export default function StartPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    > 
      <StartPageSearch />
      <StartPageCard />
    </motion.div> 
  )
}