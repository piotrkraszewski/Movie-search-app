import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import useFormTransition from "./FormsHooks/useFormTransition"
import WithFormTemplate from "./FormsHooks/WithFormTemplate"
import SubmitBtn from "./FormsHooks/SubmitBtn"
import FormikControl from './FormikControl/FormikControl'
import s from './FormStyles.module.scss'
import { usersCollection } from 'Utils/firebase'
import { useAuth } from 'AppFiles/Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { PROFILE_PAGE, LOGIN_PAGE } from 'Utils/Consts'


export default function Register() {
  const history = useHistory()
  const { register } = useAuth()
  const [submitMsg, setSubmitMsg] = useState()


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


  const onSubmit = async(values, onSubmitProps) => {
    setSubmitMsg({})
    console.log('Form values:', values)
    try {
      const registerRes = await register(values.email, values.password)

      try {
        await usersCollection.doc(registerRes.user.uid).set({
          username: values.username
        })
        history.push(PROFILE_PAGE)
      } catch (err){
        setSubmitMsg({
          submitStatus: 'error',
          message: err.message
        })
      }

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
      title={'Register'}
      submitMsg={submitMsg}
      bottomBtnText={'Have an account? Login'}
      onBottomBtnClick={() => history.push(LOGIN_PAGE)}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize>
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
              label='password' />

            <SubmitBtn text={'Register'} formik={formik} />

          </Form>
          )}
        }
      </Formik>

    </WithFormTemplate>
  )}
</>)
}