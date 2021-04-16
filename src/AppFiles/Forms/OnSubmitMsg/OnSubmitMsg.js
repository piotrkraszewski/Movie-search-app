import './OnSubmitMsg.scss'

export default function OnSubmitMsg({submitStatus}) {
  return (
    <div className='OnSubmitMsg'>
      {submitStatus === 'Register-Success' && 
        <p className='submitSuccess'>
          Created new user
        </p>
      }

      {submitStatus === 'Login-Success' && 
        <p className='submitSuccess'>
          Logged in
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
