import s from './Topbar.module.scss'
import menuIcon from 'Images/menu.svg'
import NavSearchbar from '../Searchbar/NavSearchbar'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { HOME_PAGE, PROFILE_PAGE, REGISTER_PAGE } from 'Utils/Consts'


export default function Topbar({ currentPage, openSidebar, gotoHome, gotoRegister, gotoLogin, gotoUserPanel }) {
  const { user, handleLogout } = useAuth()
  const isActive = url => currentPage === url && s.currentSite


  return (
    <nav className={s.TopBar}>
      <div className={s.Container}>

        <NavSearchbar/>

        <div className={s.hamburgerIcon}>
          <img
            src={menuIcon}
            alt='menuIcon'
            onClick={() => openSidebar()}/>
        </div>

        <ul className={s.NavMenu}>
          <div
            className={isActive(HOME_PAGE)}
            onClick={() => gotoHome()}>
              Home</div>
          {user
          ? <div
              className={isActive(PROFILE_PAGE)}
              onClick={() => gotoUserPanel()}>
                Profile</div>
          : <div
              className={isActive(REGISTER_PAGE)}
              onClick={() => gotoRegister()}>
                Register</div>
          }
        </ul>

        <div className={s.NavBtn}>
          {user
          ? <div onClick={() => handleLogout()}>Logout</div>
          : <div onClick={() => gotoLogin()}>login</div>
          }
        </div>

      </div>
    </nav>
  )
}