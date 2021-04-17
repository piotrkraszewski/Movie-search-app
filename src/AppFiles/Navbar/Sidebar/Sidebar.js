import './Sidebar.scss'
import closeIcon from 'Images/close.svg'
import { useAuth } from 'AppFiles/Contexts/AuthContext'


export default function Sidebar({isOpen, close, gotoHome, gotoRegister, gotoLogin, gotoUserPanel}) {
  const { currentUser, handleLogout } = useAuth()
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
          {!currentUser &&
          <div 
            className="sidebarLink"
            onClick={() => gotoRegister()}>
            Register
          </div>}
          {currentUser &&
          <div 
            className="sidebarLink"
            onClick={() => gotoUserPanel()}>
            Profile
          </div>}
        </ul>
        <div className="sidebarBtnWrap">
        {!currentUser &&
          <div 
            className='sidebarBtnLink' 
            onClick={() => gotoLogin()}>
            Login
          </div>}
        {currentUser &&
          <div 
            className='sidebarBtnLink' 
            onClick={() => handleLogout()}>
            Logout
          </div>}
        </div>
      </div>
    </nav>
  )
}