import styles from './SideBar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import Footer from './Footer'
function SideBar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <p>List of Cities</p>
            <Footer/>

        </div>
    )
}

export default SideBar
