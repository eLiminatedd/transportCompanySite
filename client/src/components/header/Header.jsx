import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';


export default function Header() {

  const {logoutHandler, isAuthenticated} = useContext(AuthContext);


    return (
        <header className={styles.header}>
        <nav className={styles.navbar}>
          <div >
            <img className={styles.logo} src="https://www.avtokranpodem.com/cwsd.php?Z3AuPTQ0Pw/NDc/aGp0YClgNzA7NDEgPzo8NiYiOC1_YHE.png" alt="" />
          </div>
          <div className={styles.navList}>
            <Link to="/" className={styles.navItem}>Home</Link>
            <Link to="/about" className={styles.navItem}>About</Link>
            <Link to="/equipment" className={styles.navItem}>Machines</Link>
            <Link to="/contact" className={styles.navItem}>Contact</Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className={styles.navItem}>Login</Link>
                <Link to="/register" className={styles.navItem}>Register</Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/orders" className={styles.navItem}>Submit an Order</Link>
                <Link to="/admin-panel" className={styles.navItem}>Admin Panel</Link>
                <button className={styles.navItem} onClick={logoutHandler}>Logout</button>
              </>
            )}
            </div>
        </nav>
      </header>
    );
}
