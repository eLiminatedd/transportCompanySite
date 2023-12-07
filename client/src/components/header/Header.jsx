import styles from './Header.module.css';

export default function Header() {

    return (
        <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>Logo</div>
          <ul className={styles.navList}>
            <li className={styles.navItem}>Home</li>
            <li className={styles.navItem}>About</li>
            <li className={styles.navItem}>Machines</li>
            <li className={styles.navItem}>Contact</li>
          </ul>
        </nav>
      </header>
    );
}
