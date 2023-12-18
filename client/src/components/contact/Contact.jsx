import styles from './Contact.module.css';
// Remove form No logic on server
const Contact = () => {
  return (
    <div className={styles.contact}>
      <h2 className={styles.heading}>Contact Us</h2>
      <div className={styles.contentContainer}>
        <div className={styles.formContainer}>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name</label>
              <input type="text" id="companyName" name="companyName" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
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