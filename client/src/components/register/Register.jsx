import styles from './Register.module.css';


import { useContext} from 'react';
import AuthContext from '../../context/AuthContext';
import useForm from '../../hooks/useForm';

const Register = () => {
  const {registerSubmitHandler} = useContext(AuthContext);
  const {values, onChange, onSubmit} = useForm(registerSubmitHandler, {

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
                value={values.email}
                onChange={onChange}

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
                value={values.password}
                onChange={onChange}

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
                value={values.confirmPassword}
                onChange={onChange}

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
                value={values.phone}
                onChange={onChange}

                autoComplete="tel"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={values.companyName}
                onChange={onChange}

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
                value={values.firstName}
                onChange={onChange}

                autoComplete="given-name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={onChange}

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