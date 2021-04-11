import './OnSubmitMsg.scss'

export default function OnSubmitMsg({submitStatus}) {
  return (
    <div className='OnSubmitMsg'>
      {submitStatus === 'success' && 
        <p className='submitSuccess'>
          Form successfuly submitted. 
          Unfortunately database is not running yet so your data wasn't send. Come back in the future.
        </p>
      }

      {submitStatus === 'error' && 
        <p className='submitError'>
          Form submit failed.
        </p>
      }
    </div>
  )
}
