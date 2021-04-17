import './Sidebar.scss'
import closeIcon from 'Images/close.svg'
import { useAuth } from 'AppFiles/Contexts/AuthContext'


export default function Sidebar({isOpen, close, gotoHome, gotoRegister, gotoLogin, gotoUserPanel}) {
  const { user, handleLogout } = useAuth()
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
          {!user &&
          <div 
            className="sidebarLink"
            onClick={() => gotoRegister()}>
            Register
          </div>}
          {user &&
          <div 
            className="sidebarLink"
            onClick={() => gotoUserPanel()}>
            Profile
          </div>}
        </ul>
        <div className="sidebarBtnWrap">
        {!user &&
          <div 
            className='sidebarBtnLink' 
            onClick={() => gotoLogin()}>
            Login
          </div>}
        {user &&
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