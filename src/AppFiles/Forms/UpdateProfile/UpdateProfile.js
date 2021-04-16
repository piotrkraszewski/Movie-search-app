import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../FormikControl/FormikControl'
import OnSubmitMsg from '../OnSubmitMsg/OnSubmitMsg'
import 'styles/main.scss'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { PROFILE_PAGE } from 'Utils/Consts'


export default function UpdateProfile() {
  const history = useHistory()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [emailUpdateMsg, setEmailUpdateMsg] = useState()
  const [passwordUpdateMsg, setPasswordUpdateMsg] = useState()


  const initialValues = {
    email: currentUser.email,
    username: currentUser.username,
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().min(6),
  })
  

  const onSubmit = async(values, onSubmitProps) => {
    setEmailUpdateMsg({})
    setPasswordUpdateMsg({})
    console.log('Form values:', values)

    if(values.email !== currentUser.email){
      try{
        await updateEmail(values.email)
        history.push(PROFILE_PAGE)
      } catch (err){
        setEmailUpdateMsg({
          submitStatus: 'error',
          message: 'Failed to update email. Email is probably used by another user.'
        })
      }
    }
    
    if(values.password){
      try{
        await updatePassword(values.password)
        history.push(PROFILE_PAGE)
      } catch (err){
        setPasswordUpdateMsg({
          submitStatus: 'error',
          message: 'Failed to update password.'
        })
      }
    }

    onSubmitProps.setSubmitting(false)  //enables button
  }


return (
  <div className='UpdateProfile'>
    <h2>Update Profile</h2>
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
              label='password'
              placeholder='Leave blank to keep the same' />

            <button 
              className="btn btn-success btn-green"
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting}
              >Update
            </button>

            <OnSubmitMsg {...emailUpdateMsg} />
            <OnSubmitMsg {...passwordUpdateMsg} />
          </Form>
        </div>
        )}
      }
    </Formik>
    <div className='border-top pt-3'>
      <button 
        className='btn btn-dark w-100'
        onClick={() => history.push(PROFILE_PAGE)}>
          Cancel
      </button>
    </div>
  </div>
)
}