/* eslint-disable react/prop-types */
import styles from './ApproveOrderForm.module.css';
import useForm from '../../hooks/useForm';


const ApproveOrderForm = (props) => {


    const { values, onChange, onSubmit } = useForm(props.callback, {
        testimonial: '',
      });


    return (
        <div className={styles.modalCont}>
          <h2>Approve Order</h2>
          <form onSubmit={onSubmit}>
            <div className={styles.inputBox}>
              <label htmlFor="machines">Assign machines to the order:</label>
              <input
                type="text"
                id="machines"
                name="machines"
                value={values.machines}
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
    )
}

export default ApproveOrderForm