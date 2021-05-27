import s from '../FormStyles.module.scss'

export default function WithFormTransition ({children, title, bottomBtnText, onBottomBtnClick, linkBtnText, onLinkBtnClickFunc}) {
  return (<>
    <h2>{title}</h2>

    {children}

    { linkBtnText &&
    <button
      className={`btn btn-link ${s.forgotBtn} w-100 mb-2`}
      onClick={() => onLinkBtnClickFunc()}>
        {linkBtnText}
    </button>}

    { bottomBtnText &&
    <div className='border-top pt-3'>
      <button
        className='btn btn-dark w-100'
        onClick={() => onBottomBtnClick()}>
          {bottomBtnText}
      </button>
    </div>}
  </>)
}