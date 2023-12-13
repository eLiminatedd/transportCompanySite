import styles from './Login.module.css';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import useForm from '../../hooks/useForm';


const Login = () => {
  const { loginSubmitHandler } = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
    email: '',
    password: '',
});


  

  return (
    <div className={styles.login}>
      <h2 className={styles.heading}>Login</h2>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={onChange}
              autoComplete="email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={onChange}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;


// const [formData, setFormData] = useState({
//   username: '',
//   email: '',
//   password: '',
//   confirmPassword: '',
// });

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prevData) => ({ ...prevData, [name]: value }));
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   // Handle form submission logic here
//   console.log('Form submitted:', formData);
// };