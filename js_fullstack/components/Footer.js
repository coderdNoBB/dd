import styles from "../styles/footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
         <li>
          I am a footer
         </li>
      </ul>
    </footer>
  )
}
