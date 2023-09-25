import styles from './Footer.module.css'
function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}> &copy; Copyright {new Date().getFullYear()} By World Wise INC.  </p>
        </footer>
    )
}

export default Footer
