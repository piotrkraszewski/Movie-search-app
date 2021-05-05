import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { motion } from "framer-motion"
import FormikControl from '../FormikControl/FormikControl'
import OnSubmitMsg from '../OnSubmitMsg/OnSubmitMsg'
import './ForgotPassword.scss'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { LOGIN_PAGE, PAGE_TRANSITION_TIME, REGISTER_PAGE } from 'Utils/Consts'


export default function ForgotPassword() {
  const history = useHistory()
  const { resetPassword } = useAuth()
  const [submitMsg, setSubmitMsg] = useState()


  const initialValues = {
    email: '',
  }

  // remember to comment out validation that is not used because form will not submit
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
  })
  
  const onSubmit = async(values, onSubmitProps) => {
    setSubmitMsg({})
    console.log('Form values:', values)
    try {
      await resetPassword(values.email)
      setSubmitMsg({
        submitStatus: 'success',
        message: 'Instructon for reseting your password were send to your email'
      })
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
    className='ForgotPassword'
    
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, delay :0.2 }}
    exit={{ opacity: 0 }}
    transition={{ duration: PAGE_TRANSITION_TIME }}
  >
    <h2>Password Reset</h2>
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
        <div className='FormContainer'>
          <Form className="form">

            <FormikControl 
              control='input' 
              type='email'
              name='email'
              label='email' />

            <button 
              className="btn btn-success btn-green"
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting}
              >Reset Password
            </button>

            <OnSubmitMsg {...submitMsg} />

          </Form>
        </div>
        )}
      }
    </Formik>
      <button 
        className='btn btn-link forgot w-100 mb-1'
        onClick={() => history.push(LOGIN_PAGE)}>
          Login?
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