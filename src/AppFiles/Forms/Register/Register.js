import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../FormikControl/FormikControl'
import OnSubmitMsg from '../OnSubmitMsg/OnSubmitMsg'
import 'styles/main.scss'
import { usersCollection } from 'Utils/firebase'
import { useAuth } from 'AppFiles/Contexts/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const [submitStatus, setSubmitStatus] = useState('')


  const initialValues = {
    email: '',
    username: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required').min(6),
  })
  

  const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)

    register(values.email, values.password).then(res => {
      console.log('register response', res)
      
      usersCollection.doc(res.user.uid).set({
        username: values.username
      }).then(res => {
        setSubmitStatus('success')
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
      setSubmitStatus('error')
    }) 

    onSubmitProps.setSubmitting(false)  //enables button
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