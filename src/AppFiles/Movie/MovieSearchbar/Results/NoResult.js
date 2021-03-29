export default function NoResult({onClose}) {
  return (
    <div className='searchbar_li'>
      <p className='noResult'>no result</p>
      <p 
        className='noResultClose'
        onClick={() => onClose(false)}
      >
        close
      </p>
    </div>
  )
}