import { useContext } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import { isMobile } from "react-device-detect"
import { AppContext } from 'AppFiles/Contexts/AppContext'
import './ScroolbarStyle.scss'

export default function AppScrollbar (props) {
  // displays perfect scrollbar if not on mobile because I couldn't add refresh gesture on mobile
  // https://github.com/goldenyz/react-perfect-scrollbar/issues/101

  const { infiniteScroll } = useContext(AppContext)

  return (
    // isMobile ? (
    //   <div className="overflow-y-auto">
    //     {props.children}
    //   </div>
    // ) : (
      <ScrollBar 
        className='AppScroolbar' 
        onScrollDown={e => infiniteScroll(e)}
        // onYReachEnd={e => infiniteScroll(e)}
      >
        {props.children}
      </ScrollBar>
  // )
  )
}