import 'styles/main.scss'
import Searchbar from 'AppFiles/Movie/MovieSearchbar/Hooks/Searchbar'

export default function StartPageSearch() {
  return (
    <div className='col-lg-6 col-md-8 col-sm-9 col-12 startPageSearchbar'>
      <Searchbar/>
    </div>
  )
}