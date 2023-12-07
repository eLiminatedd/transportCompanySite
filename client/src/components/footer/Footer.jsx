import styles from './Footer.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab);

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2023 Avtokran Podem</p>
        <div className={styles.socialIcons}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="fa-brands fa-facebook" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="fa-brands fa-twitter" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="fa-brands fa-instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
