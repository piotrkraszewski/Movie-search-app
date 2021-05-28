import s from '../FormStyles.module.scss'
import OnSubmitMsg from '../OnSubmitMsg/OnSubmitMsg'


export default function WithFormTransition ({children, title, submitMsg, emailUpdateMsg, passwordUpdateMsg, usernameUpdateMsg, bottomBtnText, onBottomBtnClick, linkBtnText, onLinkBtnClickFunc}) {
  return (<>
    <h2>{title}</h2>

    {children}

    <OnSubmitMsg {...submitMsg} />
    <OnSubmitMsg {...emailUpdateMsg} />
    <OnSubmitMsg {...passwordUpdateMsg} />
    <OnSubmitMsg {...usernameUpdateMsg} />

    { linkBtnText &&
    <button
      className={`btn btn-link ${s.forgotBtn} w-100`}
      onClick={() => onLinkBtnClickFunc()}>
        {linkBtnText}
    </button>}

    { bottomBtnText &&
    <div className='border-top pt-3 mt-3'>
      <button
        className='btn btn-dark w-100'
        onClick={() => onBottomBtnClick()}>
          {bottomBtnText}
      </button>
    </div>}
  </>)
}