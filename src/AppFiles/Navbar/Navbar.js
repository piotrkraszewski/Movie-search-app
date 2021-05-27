import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import Topbar from './Topbar/Topbar'
import Sidebar from './Sidebar/Sidebar'
import {BrowserRouter} from 'react-router-dom'
import { HOME_PAGE, LOGIN_PAGE, PROFILE_PAGE, REGISTER_PAGE } from 'Utils/Consts'
import { useLocation } from 'react-router-dom'


export default function Navbar() {
  const { pushToHistory, fetchPopularMoviesOnStartPage, setAllMoviesData,} = useContext(AppContext)
  const { handleLogout } = useAuth()

// === highlight current page ===
const location = useLocation()


// === Open/Close sidebar ===
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)


// === go to other pages functions ===
  const gotoHome = () => {
    setAllMoviesData([])
    fetchPopularMoviesOnStartPage()
    pushToHistory(HOME_PAGE)
    setIsSidebarOpen(false)
  }

  const gotoRegister = () => {
    pushToHistory(REGISTER_PAGE)
    setIsSidebarOpen(false)
  }

  const gotoLogin = () => {
    pushToHistory(LOGIN_PAGE)
    setIsSidebarOpen(false)
  }

  const logout = () => {
    handleLogout()
    setIsSidebarOpen(false)
  }

  const gotoUserPanel = () => {
    pushToHistory(PROFILE_PAGE)
    setIsSidebarOpen(false)
  }


  return (
    <BrowserRouter>
      <Sidebar
        currentPage={location.pathname}
        isOpen={isSidebarOpen}
        close={closeSidebar}
        gotoHome={gotoHome}
        gotoRegister={gotoRegister}
        gotoLogin={gotoLogin}
        gotoUserPanel={gotoUserPanel}
        logout={logout}
      />
      <Topbar
        currentPage={location.pathname}
        openSidebar={openSidebar}
        gotoHome={gotoHome}
        gotoRegister={gotoRegister}
        gotoLogin={gotoLogin}
        gotoUserPanel={gotoUserPanel}
      />
    </BrowserRouter>
  )
}