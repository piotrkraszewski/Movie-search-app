import 'styles/main.scss'
import closeIcon from 'Images/close.svg'
import { Link } from 'react-router-dom'


export default function Sidebar({isOpen, close, gotoHome, gotoRegister, gotoLogin}) {
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
          <div 
            className="sidebarLink"
            onClick={() => gotoRegister()}>
            Register
          </div>
        </ul>
        <div className="sidebarBtnWrap">
          <Link 
            className='sidebarBtnLink' 
            onClick={() => gotoLogin()}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}