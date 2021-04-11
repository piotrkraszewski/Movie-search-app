import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../FormikControl/FormikControl'
import OnSubmitMsg from '../OnSubmitMsg/OnSubmitMsg'
import 'styles/main.scss'


export default function Register() {
  const [submitStatus, setSubmitStatus] = useState('')


  const initialValues = {
    email: '',
    username: '',
    password: '',
  }

  // remember to comment out validation that is not used because form will not submit
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  })
  
  const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    // wait for API response and then submit
    onSubmitProps.setSubmitting(false)  //enables button
    setSubmitStatus('success')
  }


return (
  <div className='Register'>
    <h2>Register</h2>
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
          {/* <h3>{islogged ? 'Logged in' : 'Not logged in'}</h3> */}
          <Form className="form">

            <FormikControl 
              control='input' 
              type='email'
              name='email'
              label='email' />

            <FormikControl 
              control='input' 
              type='text'
              name='username'
              label='username' />

            <FormikControl 
              control='input' 
              type='password'
              name='password'
              label='password' />

            <button 
              className="btn btn-success btn-green"
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting}
              >Register
            </button>

            <OnSubmitMsg submitStatus={submitStatus} />

          </Form>
        </div>
        )}
      }
    </Formik>
  </div>
)
}