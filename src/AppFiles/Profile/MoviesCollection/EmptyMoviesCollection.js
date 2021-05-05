import s from './MoviesCollection.module.sass'


export default function MoviesCollection() {
  return (
    <div className={`${s.MoviesCollection} ${s.Empty}`}>
      <h2>Movie List:</h2>
      <p>You didn't add any movies to your list yet</p>  
    </div>
  )
}