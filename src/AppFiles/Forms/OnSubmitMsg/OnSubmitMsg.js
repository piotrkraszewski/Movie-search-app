import s from './OnSubmitMsg.module.sass'

export default function OnSubmitMsg({submitStatus, message}) {
  const classBySubmitStatus = status => {
    const statuses = {
      success: s.success,
      error: s.error,
    }

    return statuses[status] ?? null
  }

  return (
    <div className={classBySubmitStatus(submitStatus)}>
      {message}
    </div>
  )
}
