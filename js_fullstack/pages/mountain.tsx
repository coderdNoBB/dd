import styles from '../styles/Home.module.css';
import Signin from '../components/signin';
import { useState } from 'react';

export default function Home() {
  const [showLoginWin, setShowLoginWin] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.signin}>
        <button className="w-100 btn btn-lg btn-success" onClick={() => setShowLoginWin(true)}>Sign in</button>
      </div>

      {showLoginWin && <div className="align-middle d-inline-block w-50">
        <Signin />
      </div>}
    </div>
  )
}
