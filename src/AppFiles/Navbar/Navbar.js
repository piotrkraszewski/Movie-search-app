import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import Topbar from './Topbar/Topbar'
import Sidebar from './Sidebar/Sidebar'
import {BrowserRouter} from 'react-router-dom'


export default function Navbar() {
  const { pushToHistory, fetchPopularMoviesOnStartPage, setAllMoviesData,} = useContext(AppContext)


  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)
  
  const gotoHome = () => {
    setAllMoviesData([])
    fetchPopularMoviesOnStartPage()
    pushToHistory(`/`)
    setIsSidebarOpen(false)
  }

  const gotoRegister = () => {
    pushToHistory(`/register`)
    setIsSidebarOpen(false)
  }

  const gotoLogin = () => {
    pushToHistory(`/login`)
    setIsSidebarOpen(false)
  }

  const gotoUserPanel = () => {
    pushToHistory(`/user-panel`)
    setIsSidebarOpen(false)
  }

  return (
    <BrowserRouter>
      <Sidebar 
        isOpen={isSidebarOpen}
        close={closeSidebar}
        gotoHome={gotoHome}
        gotoRegister={gotoRegister}
        gotoLogin={gotoLogin}
        gotoUserPanel={gotoUserPanel}
      />
      <Topbar
        openSidebar={openSidebar}
        gotoHome={gotoHome}
        gotoRegister={gotoRegister}
        gotoLogin={gotoLogin}
        gotoUserPanel={gotoUserPanel}
      />
    </BrowserRouter>
  )
}