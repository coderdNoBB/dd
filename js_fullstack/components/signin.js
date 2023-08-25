import cx from 'classnames';
import styles from '../styles/Signin.module.css'
import { useState, useEffect } from 'react';

export default Signin;

function Signin() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true)
    console.log('form submitted ✅');
    // TODO do login
    setSubmitting(false)
  };

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        console.log('Pressed Enter ✅');
        // TODO do login
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
      <main className={cx(styles["form-signin"], "text-center", "mt-5", "border", "bg-white")}>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input className="form-control" id="floatingInput" placeholder="d" />
            <label htmlFor="floatingInput">User Name</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className={cx(styles.checkbox, "mb-3")}>
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-success" disabled={submitting} type="submit">Sign in</button>
        </form>
      </main>
    </>
  )
}