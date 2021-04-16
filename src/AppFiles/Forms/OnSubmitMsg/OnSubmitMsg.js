import './OnSubmitMsg.scss'

export default function OnSubmitMsg({submitStatus, message}) {
  return (
    <div className='OnSubmitMsg'>

      {submitStatus === 'success' && 
        <p className='submitSuccess'>
          {message}
        </p>
      }

      {submitStatus === 'error' && 
        <p className='submitError'>
          {message}
        </p>
      }

    </div>
  )
}
