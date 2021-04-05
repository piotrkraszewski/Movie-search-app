import 'styles/main.scss'
import menuIcon from 'Images/menu.svg'
import { Link } from 'react-router-dom'



export default function Topbar({ openSidebar, gotoHome, render }) {
  return (
    <nav className='TopBar'>
      <div className='TopBarContainer'>

        {render()}

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
              onClick={{}}>
              Sign Up
            </div>
          </li>
        </ul>
        <div className='NavBtn'>
          <div 
            className='NavBtnLink' 
            to='/signin'
          >
            Sign In
          </div>
        </div>
      </div>
    </nav>
  )
}