// import "react-widgets/scss/styles.scss"
import {useState} from 'react'
import './MovieStatusWidget.scss'
import DropdownList from "react-widgets/DropdownList"

export default function ReactWidget() {
  const [status, setStatus] = useState("Not Added")
  const [rating, setRating] = useState("Not Added")

  return (
    <div className='MovieStatusWidgets'>
      <div className='Widget'>
        <p>Status</p>
        <DropdownList
          defaultValue="Not Added"
          filter={false}  // prevents from writing in box
          value={status}
          onChange={nextValue => setStatus(nextValue)}
          textField="color"
          data={["Watching", "Plan to watch", "Completed", "Paused", "Dropped", "Not Added"]}
        />
      </div>
      <div className='Widget'>
        <p>Rating</p>
        <DropdownList
          defaultValue="Not Added"
          filter={false}  // prevents from writing in box
          value={rating}
          onChange={nextValue => setRating(nextValue)}
          textField="color"
          data={['1', '2', '3', '4', '5']}
        />
      </div>
    </div>
  )
}