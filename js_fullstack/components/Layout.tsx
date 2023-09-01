import Header from "./Header"
import Footer from "./Footer"
import styles from '../styles/Layout.module.css';
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.defaultLayout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}
