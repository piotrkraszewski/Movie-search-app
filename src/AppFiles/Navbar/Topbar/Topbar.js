import 'styles/main.scss'
import menuIcon from 'Images/menu.svg'
import NavSearchbar from '../Searchbar/NavSearchbar'


export default function Topbar({ openSidebar, gotoHome, gotoRegister, gotoLogin }) {
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
            <div 
              className='NavLink'
              onClick={() => gotoRegister()}
              >
              Register
            </div>
          </li>
        </ul>
        <div className='NavBtn'>
          <div 
            className='NavBtnLink' 
            onClick={() => gotoLogin()}
          >
            login
          </div>
        </div>
      </div>
    </nav>
  )
}