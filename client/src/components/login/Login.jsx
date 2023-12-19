import styles from './Login.module.css';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import ValidationContext from '../../context/ValidationContext';
import useForm from '../../hooks/useForm';

const Login = () => {
  const { loginSubmitHandler } = useContext(AuthContext);
  const { emailValidator, passwordValidator, vldErrors } = useContext(ValidationContext);
  const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
    email: '',
    password: '',
  });






  return (
    <div className={styles.login}>
      <h2 className={styles.heading}>Login</h2>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup} >
            <label htmlFor="email">Email</label>
            <input style={{borderColor: vldErrors.email ? 'Red' : ''}}
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={onChange}
              onBlur={emailValidator}
              autoComplete="email"
              required
            />
          </div>
          <p className={styles.errorText}>{vldErrors.email}</p>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input style={{borderColor: vldErrors.password ? 'Red' : ''}}
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={onChange}
              onBlur={passwordValidator}
              autoComplete="current-password"
              required
            />
          </div>
          <p className={styles.errorText}>{vldErrors.password}</p>
          <button  style={{backgroundColor: vldErrors ? 'Gray' : ''}} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
