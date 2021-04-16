import './OnSubmitMsg.scss'

export default function OnSubmitMsg({submitStatus, message}) {
  return (
    <div className='OnSubmitMsg'>

      {submitStatus === 'error' && 
        <p className='submitError'>
          {message}
        </p>
      }

    </div>
  )
}
