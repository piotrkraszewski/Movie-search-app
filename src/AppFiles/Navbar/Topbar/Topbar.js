import 'styles/main.scss'
import menuIcon from 'Images/menu.svg'
import StartPageSearchbar from '../Searchbar/NavSearchbar'


export default function Topbar({ openSidebar, gotoHome }) {
  return (
    <nav className='TopBar'>
      <div className='TopBarContainer'>

      <StartPageSearchbar/>

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
              // onClick={{}}
              >
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