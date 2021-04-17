import './Topbar.scss'
import menuIcon from 'Images/menu.svg'
import NavSearchbar from '../Searchbar/NavSearchbar'
import { useAuth } from 'AppFiles/Contexts/AuthContext'


export default function Topbar({ openSidebar, gotoHome, gotoRegister, gotoLogin, gotoUserPanel }) {
  const { user, handleLogout } = useAuth()
  return (
    <nav className='TopBar'>
      <div className='TopBarContainer'>

      <NavSearchbar/>

        <div className='hamburgerIconContainer'>
          <img 
            className='hamburgerIcon'
            src={menuIcon} 
            alt='menuIcon' 
            onClick={() => openSidebar()}
          />
        </div>
        <ul className='NavMenu'>
          <li className='NavItem'>
            <div 
              className='NavLink' 
              onClick={() => gotoHome()}>
              Home
            </div>
          </li>
          <li className='NavItem'>
            {!user && 
            <div 
              className='NavLink'
              onClick={() => gotoRegister()}
              >
              Register
            </div>}
          </li>
          <li className='NavItem'>
            {user && 
            <div 
              className='NavLink'
              onClick={() => gotoUserPanel()}
              >
              Profile
            </div>}
          </li>
        </ul>
        <div className='NavBtn'>
        {!user &&
          <div 
            className='NavBtnLink' 
            onClick={() => gotoLogin()}
          >
            login
          </div>}
          {user &&
          <div 
            className='NavBtnLink' 
            onClick={() => handleLogout()}
          >
            Logout
          </div>}
        </div>
      </div>
    </nav>
  )
}