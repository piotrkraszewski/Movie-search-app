import { useState } from 'react'
import { Formik, Form } from 'formik'
import { motion } from "framer-motion"
import * as Yup from 'yup'
import FormikControl from './FormikControl/FormikControl'
import OnSubmitMsg from './OnSubmitMsg/OnSubmitMsg'
import s from './BaseFormStyles.module.scss'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { PROFILE_PAGE, FORGOT_PASSWORD, REGISTER_PAGE, PAGE_TRANSITION_TIME } from 'Utils/Consts'


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


return (
  <motion.div
    className={s.formContainer}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay :0.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: PAGE_TRANSITION_TIME }}
  >
    <h2>Login</h2>
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

          <OnSubmitMsg {...submitMsg} />

        </Form>
        )}
      }
    </Formik>

      <button
        className={`btn btn-link ${s.forgotBtn} w-100 mb-2`}
        onClick={() => history.push(FORGOT_PASSWORD)}>
          Forgot password?
      </button>
    <div className='border-top pt-3'>
      <button
        className='btn btn-dark w-100'
        onClick={() => history.push(REGISTER_PAGE)}>
          Need an account? Register
      </button>
    </div>
  </motion.div>
)
}