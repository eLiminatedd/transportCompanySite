import styles from './Contact.module.css';
// Remove form No logic on server
const Contact = () => {
  return (
    <div className={styles.contact}>
      <h2 className={styles.heading}>Contact Us</h2>
      <div className={styles.contentContainer}>
        <div className={styles.contactInfoCard}>
          <div className={styles.infoCard}>
            <h3>Contact Information</h3>
            <p>Email: example@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Main St, Cityville</p>
          </div>
          <div className={styles.mapContainer}>
            <p>Add map here</p>
            {/* <iframe
              title="Google Maps"
              className={styles.map}
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=City+Name`}
              allowFullScreen
            ></iframe> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;