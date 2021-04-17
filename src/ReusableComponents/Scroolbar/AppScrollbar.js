import { useContext } from 'react'
import './ScroolbarStyle.scss'
import ScrollBar from 'react-perfect-scrollbar'
import { AppContext } from 'AppFiles/Contexts/AppContext'

export default function AppScrollbar (props) {
  // still can't add refresh gesture on mobile
  // https://github.com/goldenyz/react-perfect-scrollbar/issues/101

  const { infiniteScroll, scrollBarRef, dispPostersNum } = useContext(AppContext)

  return (
    <ScrollBar 
      className={'AppScroolbar'} 
      // adds and clears on scroll event
      onScrollDown={ dispPostersNum < 20 ? (e) => infiniteScroll(e) : undefined}  
      // onYReachEnd={e => infiniteScroll(e)}
      ref = { scrollBarRef }
    >
      {props.children}
    </ScrollBar>
  )
}