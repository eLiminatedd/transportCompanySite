/* eslint-disable react/prop-types */
import useForm from '../../hooks/useForm';
import styles from './reviewForm.module.css';

const ReviewOrderForm = (props) => {
  const { values, onChange, onSubmit } = useForm(props.callback, {
    description: '',
  });

  return (
    <div className={styles.modalCont}>
      <h2>Leave a Review</h2>
      <form onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          <textarea
            className={styles.reviewTextarea}
            id="description"
            name="description"
            value={values.description}
            onChange={onChange}
            required
            autoComplete="off"
          />
          <button className={styles.sbmtBtn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewOrderForm;
