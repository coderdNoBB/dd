import cx from 'classnames';
import styles from '../styles/Signin.module.css'
import { useState, useEffect } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

export default function SignIn({ csrfToken }) {
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = event => {
    event.preventDefault();
    console.log('form submitted ✅');
    // TODO do login
  };

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        formik.handleSubmit
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(10, 'Must be 10 characters or less')
            .required('Please enter your username'),
          password: Yup.string()
            .max(64, 'Must be 64 characters or less')
            .required('Please enter your password'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values)
          const res = await signIn('Credentials', {
            redirect: false,
            username: values.username,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
          })
          console.log(res)
          // if (res?.error) {
          //   setError(res.error)
          // } else {
          //   setError(null)
          // }
          // if (res.url) router.push(res.url)
          setSubmitting(false)
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <main className={cx(styles["form-signin"], "text-center", "mt-5", "border", "bg-white")}>
            <form onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="text-red-400 text-md text-center rounded p-2">
                {error}
              </div>
              <div className="form-floating">
                <input className="form-control" id="floatingInput" onChange={handleChange}
                  onBlur={handleBlur} value={values.username} name="username" placeholder="d" />
                <label htmlFor="floatingInput">User Name</label>
                <div className="text-red-600 text-sm">
                  <ErrorMessage name="username" />
                </div>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword"  onChange={handleChange}
                  onBlur={handleBlur} value={values.password}  name="password" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
                <div className="text-red-600 text-sm">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div className={cx(styles.checkbox, "mb-3")}>
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-success" disabled={isSubmitting} type="submit">Sign in</button>
            </form>
          </main>
        )}
      </Formik>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}