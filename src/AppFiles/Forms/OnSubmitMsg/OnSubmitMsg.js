import './OnSubmitMsg.scss'

export default function OnSubmitMsg({submitStatus}) {
  return (
    <div className='OnSubmitMsg'>
      {submitStatus === 'success' && 
        <p className='submitSuccess'>
          Form successfuly submitted. 
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
