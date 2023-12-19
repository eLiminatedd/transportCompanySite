import styles from './Register.module.css';

import ValidationContext from '../../context/ValidationContext';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import useForm from '../../hooks/useForm';

const Register = () => {
  const { registerSubmitHandler } = useContext(AuthContext);
  const {
    emailValidator,
    phoneValidator,
    confPasswordValidator,
    usernameValidator,
    nameValidator,
    passwordValidator,
    vldErrors,
  } = useContext(ValidationContext);
  const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    companyName: '',
    firstName: '',
    lastName: '',
  });



  return (
    <div className={styles.register}>
      <h2 className={styles.heading}>Register</h2>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmit} className={styles.registerForm}>
          <div className="twofieldsbox">
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={onChange}
                onBlur={usernameValidator}
                autoComplete="Username"
                required
              />
            </div>
              <p className={styles.errorText}>{vldErrors.username}</p>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onBlur={emailValidator}
                onChange={onChange}
                autoComplete="email"
                required
              />
            </div>
            <p className={styles.errorText}>{vldErrors.email}</p>
          </div>

          <div className="twofieldsbox">
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={onChange}
                onBlur={passwordValidator}
                autoComplete="new-password"
                required
              />
            </div>
            <p className={styles.errorText}>{vldErrors.password}</p>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
                onBlur={confPasswordValidator}
                autoComplete="new-password"
                required
              />
            </div>
            <p className={styles.errorText}>{vldErrors.confirmPassword}</p>
          </div>

          <div className="twofieldsbox">
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={onChange}
                onBlur={phoneValidator}
                autoComplete="tel"
              />
            </div>
            <p className={styles.errorText}>{vldErrors.phone}</p>

            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={values.companyName}
                onChange={onChange}
                onBlur={nameValidator}
                autoComplete="organization"
              />
            </div>
            <p className={styles.errorText}>{'Company ' + vldErrors.name}</p>
          </div>

          <div className="twofieldsbox">
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={onChange}
                onBlur={nameValidator}
                autoComplete="given-name"
              />
            </div>
            <p className={styles.errorText}>{'First ' + vldErrors.name}</p>

            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={onChange}
                onBlur={nameValidator}
                autoComplete="family-name"
              />
            </div>
            <p className={styles.errorText}>{'Last ' + vldErrors.name}</p>
          </div>
          <br />
          <div className={styles.buttonContainer}>
            <button style={{backgroundColor: vldErrors ? 'Gray' : ''}} type="submit" className={styles.buttonRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
