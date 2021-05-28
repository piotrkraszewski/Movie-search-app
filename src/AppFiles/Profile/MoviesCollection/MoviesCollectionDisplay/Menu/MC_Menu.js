import { useState, useEffect, useRef } from 'react'
import s from './MC_Menu.module.sass'
import dotsIcon from 'Images/ellipsis.svg'
import orderBy from 'lodash/orderBy'
import { STATUS_OPTIONS, RATING, ASC, DESC } from 'Utils/Consts'
import DropdownListTemplate from 'ReusableComponents/DropdownListTemplate'


export default function MCLists({userMovies, setUserMovies, status, setStatus}) {
  const [hidden, setHidden] = useState(true)
  const [sortBy, setSortBy] = useState(RATING)
  const [order, setOrder] = useState(DESC)
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

  useEffect(() => {
    setUserMovies(orderBy(userMovies, RATING, DESC))
  }, [sortBy])

  useEffect(() => {
    setUserMovies(orderBy(userMovies, sortBy, order))
  }, [order])


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

      <DropdownListTemplate
        className={`${s.Widget} ${hidden && s.hiddenWiget}`}
        label={'Sort by'}
        value={sortBy}
        onChangeFunc={value => setSortBy(value)}
        data={['rating', 'Title']}
      />
      <DropdownListTemplate
        className={`${s.Widget} ${hidden && s.hiddenWiget}`}
        label={'Order'}
        value={order}
        onChangeFunc={value => setOrder(value)}
        data={[DESC, ASC]}
      />
    </div>
  )
}