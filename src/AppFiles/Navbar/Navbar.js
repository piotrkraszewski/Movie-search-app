import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from 'AppFiles/Contexts/AppContext'
import Topbar from './Topbar/Topbar'
import Sidebar from './Sidebar/Sidebar'
import {BrowserRouter} from 'react-router-dom'
import StartPageSearchbar from './Searchbar/StartPageSearchbar'

export default function Navbar() {
  const { pushToHistory, fetchPopularMoviesOnStartPage, setAllMoviesData} = useContext(AppContext)


  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)
  
  const gotoHome = () => {
    setAllMoviesData([])
    fetchPopularMoviesOnStartPage()
    pushToHistory(`/`)
    setIsSidebarOpen(false)
  }

  return (
    <BrowserRouter>
      <Sidebar 
        isOpen={isSidebarOpen}
        close={closeSidebar}
        gotoHome={gotoHome}
      />
      <Topbar
        openSidebar={openSidebar}
        gotoHome={gotoHome}
        render={() => <StartPageSearchbar/>}
      />
    </BrowserRouter>
  )
}