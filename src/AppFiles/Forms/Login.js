import { useState } from 'react'
import { Formik, Form } from 'formik'
import useFormTransition from "./FormsHooks/useFormTransition"
import WithFormTemplate from "./FormsHooks/WithFormTemplate"
import * as Yup from 'yup'
import FormikControl from './FormikControl/FormikControl'
import s from './FormStyles.module.scss'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { PROFILE_PAGE, FORGOT_PASSWORD, REGISTER_PAGE } from 'Utils/Consts'


export default function Login() {
  const history = useHistory()
  const { login } = useAuth()
  const [submitMsg, setSubmitMsg] = useState()


  const initialValues = {
    email: '',
    password: '',
  }

  // remember to comment out validation that is not used because form will not submit
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required').min(6),
  })

  const onSubmit = async(values, onSubmitProps) => {
    setSubmitMsg({})
    console.log('Form values:', values)
    try {
      const registerRes = await login(values.email, values.password)
      // console.log('login response', registerRes)
      history.push(PROFILE_PAGE)
    } catch (err){
      setSubmitMsg({
        submitStatus: 'error',
        message: err.message
      })
    }

    onSubmitProps.setSubmitting(false)  //enables button
  }


return (<>
  {useFormTransition(
    <WithFormTemplate
      title={'Login'}
      submitMsg={submitMsg}
      bottomBtnText={'Need an account? Register'}
      onBottomBtnClick={() => history.push(REGISTER_PAGE)}
      linkBtnText={'Forgot password?'}
      onLinkBtnClickFunc={() => history.push(FORGOT_PASSWORD)}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
      {
      formik => {
        // console.log(formik)
        return (
          <Form className={s.formFields}>

            <FormikControl
              control='input'
              type='email'
              name='email'
              label='email' />

            <FormikControl
              control='input'
              type='password'
              name='password'
              label='password' />

            <button
              className={`btn btn-success ${s.btnGreen}`}
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting}
              >Log In
            </button>


          </Form>
          )}
        }
      </Formik>

    </WithFormTemplate>
  )}
</>)
}