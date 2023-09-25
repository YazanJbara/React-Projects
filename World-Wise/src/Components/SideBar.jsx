import styles from './SideBar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
function SideBar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            {/* instead of hard coded p element we will use the Outlet to view what is inside the nested route 
                so any of the nested routes if you navigate to it it will show the content inside this route in the sidebar            
            */}
            
            <Outlet/>
            <Footer/>

        </div>
    )
}

export default SideBar
