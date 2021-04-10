import 'styles/main.scss'
import closeIcon from 'Images/close.svg'


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
          <div 
            className='sidebarBtnLink' 
            onClick={() => gotoLogin()}>
            Login
          </div>
        </div>
      </div>
    </nav>
  )
}