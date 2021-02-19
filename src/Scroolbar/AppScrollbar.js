import ScrollBar from 'react-perfect-scrollbar'
import { isMobile } from "react-device-detect";
import './ScroolbarStyle.scss'

export default function AppScrollbar (props) {
  // displays perfect scrollbar if not on mobile because I couldn't add refresh gesture on mobile
  return (
    isMobile ? (
      <div className={"overflow-y-auto"}>
        {props.children}
      </div>
    ) : (
      <ScrollBar className={'AppScroolbar'}>
        {props.children}
      </ScrollBar>
  ))
}