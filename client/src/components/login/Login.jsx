import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.login}>
      <h2 className={styles.heading}>Login</h2>
      <div className={styles.formContainer}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;