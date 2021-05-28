import s from './Sidebar.module.scss'
import closeIcon from 'Images/close.svg'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { HOME_PAGE, PROFILE_PAGE, REGISTER_PAGE } from 'Utils/Consts'


export default function Sidebar({currentPage, isOpen, close, gotoHome, gotoRegister, gotoLogin, gotoUserPanel, logout}) {
  const { user } = useAuth()
  const isActive = url => (currentPage === url && s.currentSite).toString()


  return (
    <nav className={`${s.Sidebar} ${isOpen && s.open}`}>

      <div className={s.closeBtn}>
        <img
          src={closeIcon}
          alt='close button'
          onClick={()=> close()}/>
      </div>

      <div className={s.itemsContainer}>

        <div className={s.menu}>
          <p className={isActive(HOME_PAGE)}
             onClick={() => gotoHome()}>Home</p>
          {user
          ? <p className={isActive(PROFILE_PAGE)}
               onClick={() => gotoUserPanel()}>Profile</p>
          : <p className={isActive(REGISTER_PAGE)}
               onClick={() => gotoRegister()}>Register</p>
          }
        </div>

        <div className={s.btn}>
          {user
          ? <div onClick={() => logout()}>Logout</div>
          : <div onClick={() => gotoLogin()}>Login</div>
          }
        </div>

      </div>

    </nav>
  )
}