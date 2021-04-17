import { createContext, useContext, useRef } from 'react'
import './ScroolbarStyle.scss'
import ScrollBar from 'react-perfect-scrollbar'
import { AppContext } from 'AppFiles/Contexts/AppContext'

const AppScrollbarContext = createContext()

export function useAppScrollbar(){
  return useContext(AppScrollbarContext)
}

export default function AppScrollbar (props) {
  // still can't add refresh gesture on mobile
  // https://github.com/goldenyz/react-perfect-scrollbar/issues/101

  const { dispPostersNum, setDispPostersNum } = useContext(AppContext)
  const scrollBarRef = useRef(null)

  

  const infiniteScroll = e => {
    // console.log('infinite Scroll')
    setDispPostersNum(20)
  }

  return (
    <ScrollBar 
      className='AppScroolbar'
      // adds and clears on scroll event
      onScrollDown={ dispPostersNum < 20 ? () => infiniteScroll() : undefined}  
      // onYReachEnd={e => infiniteScroll(e)}
      ref = { scrollBarRef }
    >
      <AppScrollbarContext.Provider value={{scrollBarRef}}>
        {props.children}
      </AppScrollbarContext.Provider>
    </ScrollBar>
  )
}