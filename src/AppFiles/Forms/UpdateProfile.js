import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import useFormTransition from "./FormsHooks/useFormTransition"
import WithFormTemplate from "./FormsHooks/WithFormTemplate"
import SubmitBtn from "./FormsHooks/SubmitBtn"
import FormikControl from './FormikControl/FormikControl'
import s from './FormStyles.module.scss'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { PROFILE_PAGE } from 'Utils/Consts'
import { usersCollection } from 'Utils/firebase'


export default function UpdateProfile() {
  const history = useHistory()
  const { user, userData, setUserData, loadUserData, updatePassword, updateEmail } = useAuth()
  const [emailUpdateMsg, setEmailUpdateMsg] = useState()
  const [passwordUpdateMsg, setPasswordUpdateMsg] = useState()


  const initialValues = {
    email: user.email,
    username: userData.username,
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

    if(values.email !== user.email){
      try{
        await updateEmail(values.email)
        setUserData({})
        loadUserData()
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
        loadUserData()
        history.push(PROFILE_PAGE)
      } catch (err){
        setPasswordUpdateMsg({
          submitStatus: 'error',
          message: 'Failed to update password.'
        })
      }
    }

    if(values.email !== user.email){
      try{
        await updateEmail(values.email)
        loadUserData()
        history.push(PROFILE_PAGE)
      } catch (err){
        setEmailUpdateMsg({
          submitStatus: 'error',
          message: 'Failed to update email. Email is probably used by another user.'
        })
      }
    }

    if(values.username !== userData.username){
      try {
        await usersCollection.doc(user.uid).set({
          username: values.username
        }, { merge: true })
        loadUserData()
        history.push(PROFILE_PAGE)
      } catch (err){
        console.log(err)
        // setSubmitMsg({
        //   submitStatus: 'error',
        //   message: err.message
        // })
      }
    }

    onSubmitProps.setSubmitting(false)  //enables button
  }


///////////////////////////////////////////////////
return (<>
  {useFormTransition(
    <WithFormTemplate
      title={'Update Profile'}
      emailUpdateMsg={emailUpdateMsg}
      passwordUpdateMsg={passwordUpdateMsg}
      bottomBtnText={'Cancel'}
      onBottomBtnClick={() => history.push(PROFILE_PAGE)}>


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
              type='text'
              name='username'
              label='username' />

            <FormikControl
              control='input'
              type='password'
              name='password'
              label='password'
              placeholder='Leave blank to keep the same' />

            <SubmitBtn text={'Update'} formik={formik} />

          </Form>
          )}
        }
      </Formik>

    </WithFormTemplate>
  )}
</>)
}