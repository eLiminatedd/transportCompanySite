/* eslint-disable react/prop-types */
import styles from './Spinner.module.css'; // Import the CSS file for styling

const OrangeSpinner = ({width, height}) => {
  return (
    <>
        <div className={styles.orangeSpinnerContainer}>
          <div style={{width:`${width}`, height:`${height}`}}className={styles.orangeSpinner}></div>
        </div>
    </>
  );
};

export default OrangeSpinner;
