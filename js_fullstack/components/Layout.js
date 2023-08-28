import Header from "./Header"
import Footer from "./Footer"
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.defaultLayout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}
