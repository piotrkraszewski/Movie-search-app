import { useEffect } from 'react'
import s from './Comments.module.scss'
import FormikControl from 'AppFiles/Forms/FormikControl/FormikControl'
import {resizeTextarea} from './CommentsFunctions';
import * as Yup from 'yup'
import { Formik, Form } from 'formik'


export default function Comments() {
  const onSubmit = async(values, onSubmitProps) => {
    // setSubmitMsg({})
    // console.log('Form values:', values)
    // try {
    //   await login(values.email, values.password)
    //   history.push(PROFILE_PAGE)
    // } catch (err){
    //   setSubmitMsg({
    //     submitStatus: 'error',
    //     message: err.message
    //   })
    // }

    // onSubmitProps.setSubmitting(false)  //enables button
  }

  useEffect(() => {
    resizeTextarea()
  },[])


  return (
    <div className={s.commentsContainer}>
      <h4>Comments section</h4>
      <Formik
        initialValues={{ text: '' }}
        validationSchema={Yup.object({
            text: Yup.string().required('Required').min(1),
          })}
        onSubmit={onSubmit}
        enableReinitialize
      >
      {
      formik => {
        // console.log(formik)
        return (
          <Form className={s.formContainer}>

            <FormikControl
              control='textarea'
              type='textarea'
              name='textarea' />

            <div className={s.btnContainer}>
              <button className={`btn ${s.button}`}>
                Comment
              </button>
            </div>
          </Form>
        )}}

      </Formik>
    </div>
  )
}
