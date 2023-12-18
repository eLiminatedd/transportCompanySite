/* eslint-disable react/prop-types */
import styles from './Spinner.module.css'; // Import the CSS file for styling

const OrangeSpinner = () => {
  return (
    <>
        <div className={styles.orangeSpinnerContainer}>
          <div className={styles.orangeSpinner}></div>
        </div>
    </>
  );
};

export default OrangeSpinner;
