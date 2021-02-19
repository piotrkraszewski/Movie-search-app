import ScrollBar from 'react-perfect-scrollbar'
import './ScroolbarStyle.scss'

export default function AppScroolbar (props) {
  return (
    <ScrollBar 
      className={'AppScroolbar'}
      onYReachStart={() => console.log('helo')}
    >
      {props.children}
    </ScrollBar>
  )
}