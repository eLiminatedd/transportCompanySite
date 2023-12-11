import styles from './Register.module.css';
import { register } from '../../services/AuthService';

import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    companyName: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    const { email, username, password, phone, companyName, firstName, lastName } = formData;
    //find a way to validate inputs
    const resp = await register(email, username, password, phone, companyName, firstName, lastName);
    console.log(resp);
  };

  return (
    <div className={styles.register}>
      <h2 className={styles.heading}>Register</h2>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className="twofieldsbox">
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="Username"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="twofieldsbox">
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="twofieldsbox">
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                // pattern="[0-9]{10}" 
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>
          </div>

          <div className="twofieldsbox">
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
              />
            </div>
          </div>
          <br />
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.buttonRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
