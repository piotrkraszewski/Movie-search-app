import 'styles/main.scss'
import closeIcon from 'Images/close.svg'
import { Link } from 'react-router-dom'

export default function Sidebar({isOpen, close, gotoHome}) {
  

  return (
    <nav className={'Sidebar ' + (isOpen && 'openSidebar')}>
      <div className='closeIconContainer'>
        <img 
          src={closeIcon} 
          className='closeIcon'
          alt='The Movie Database Logo' 
          onClick={()=> close()}
        />
      </div>
      <div className="sidebarWrapper">
        <ul className="sidebarMenu">
          <div 
            className="sidebarLink"
            onClick={() => gotoHome()}>
            Home
          </div>
          <div className="sidebarLink">
            sign up
          </div>
        </ul>
        <div className="sidebarBtnWrap">
          <Link className='sidebarBtnLink' to='/signin'>
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  )
}