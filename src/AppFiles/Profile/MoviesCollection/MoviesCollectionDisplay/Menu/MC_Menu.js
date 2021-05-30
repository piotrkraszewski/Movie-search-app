import { useState, useEffect, useRef } from 'react'
import s from './MC_Menu.module.sass'
import dotsIcon from 'Images/ellipsis.svg'
import { STATUS_OPTIONS, ASC, DESC, RATING, TITLE, MODIFIED } from 'Utils/Consts'
import DropdownListTemplate from 'ReusableComponents/DropdownListTemplate'
import { motion, AnimateSharedLayout } from "framer-motion"


export default function MCLists({props}) {
  const {userMovies, setUserMovies, status, setStatus, sortBy, setSortBy, order, setOrder} = props

  const [hidden, setHidden] = useState(true)
  const disabledList = useRef([])


  // display not empty movie list on page load
  // create "disabledList" where lists are empty
  useEffect(() => {
    let initStatus
    STATUS_OPTIONS.forEach(item => {
      const moviesWithItemsStatus = userMovies.filter(movie =>
        movie.status === item)

      if(!moviesWithItemsStatus.length) disabledList.current.push(item)
      else if(!initStatus) initStatus = item
    })
    setStatus(initStatus)
  }, [])


  return (
    <div className={s.Widgets}>
      <div className={s.watchingContainer}>

        <DropdownListTemplate
          className={s.Widget}
          label={'Status'}
          value={status}
          onChangeFunc={value => setStatus(value)}
          data={STATUS_OPTIONS}
          disabled={disabledList.current}
        />

        <div className={s.hamburgerIcon}>
          <img
            src={dotsIcon}
            alt='menuIcon'
            onClick={() => setHidden(!hidden)}/>
        </div>

      </div>

      <motion.div layout='true'>
      <DropdownListTemplate
        className={`${s.Widget} ${hidden && s.hiddenWiget}`}
        label={'Sort by'}
        value={sortBy}
        onChangeFunc={value => setSortBy(value)}
        data={[RATING, TITLE, MODIFIED]}
      />
      <DropdownListTemplate
        className={`${s.Widget} ${hidden && s.hiddenWiget}`}
        label={'Order'}
        value={order}
        onChangeFunc={value => setOrder(value)}
        data={[DESC, ASC]}
      />
      </motion.div>
    </div>
  )
}