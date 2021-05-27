import s from '../FormStyles.module.scss'

export default function SubmitBtn({text, formik }) {
  return (
    <button
      className={`btn btn-success ${s.btnGreen}`}
      type='submit'
      disabled={!formik.isValid || formik.isSubmitting}
    >
      {text}
    </button>
  )
}
