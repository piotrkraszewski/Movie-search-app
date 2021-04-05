import 'styles/main.scss'
import menuIcon from 'Images/menu.svg'
import TMDBLogo from 'Images/tmdb.svg'
import { Link } from 'react-router-dom'


export default function Topbar({ openSidebar, gotoHome }) {
  return (
    <nav className='TopBar'>
      <div className='TopBarContainer'>
        <Link className='NavLogoContainer' to='/'>
          <img 
            src={TMDBLogo} 
            className='NavLogo'
            alt='The Movie Database Logo' 
          />
        </Link>
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
            <Link className='NavLink' to='/signup'>Sign Up</Link>
          </li>
        </ul>
        <div className='NavBtn'>
          <Link 
            className='NavBtnLink' 
            to='/signin'
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  )
}