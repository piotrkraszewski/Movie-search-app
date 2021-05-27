import { PAGE_TRANSITION_TIME } from 'Utils/Consts'
import { motion } from "framer-motion"
import s from '../FormStyles.module.scss'

export default function useFormTransition (Component) {
  return (
    <motion.div
      className={s.formContainer}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay :0.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: PAGE_TRANSITION_TIME }}
    >
      {Component}
    </motion.div>
  )
}