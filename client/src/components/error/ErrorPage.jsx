/* eslint-disable react/prop-types */
import styles from './ErrorPage.module.css'; // Import the module CSS file for styling

const ErrorPage = ({ error }) => {
  return (
    <div className={styles.errorPageContainer}>
      <h2 className={styles.errorHeading}>{error.status}</h2>
      <p className={styles.errorMessage}>{error.message}</p>
    </div>
  );
};

export default ErrorPage;
