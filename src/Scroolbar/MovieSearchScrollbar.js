import ScrollBar from 'react-perfect-scrollbar';
import './ScroolbarStyle.scss';

export default function MovieSearchScrollbar(props){
  const {show, text} = props
  return (
    <ScrollBar 
      className={(show && text) 
      ? 'MovieSearchScroolbar' 
      : 'offScroolBar MovieSearchScroolbar'}
    >
      {props.children}
    </ScrollBar>
  )
}