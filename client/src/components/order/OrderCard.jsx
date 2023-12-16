/* eslint-disable react/prop-types */
import styles from './OrderPage.module.css';
import * as contractsService from '../../services/contractsService';
import Modal from 'react-modal';
import { useState } from 'react';
import useForm from '../../hooks/useForm';

Modal.setAppElement('#root');

// add orderCard module css for ordercard styles
const OrderCard = ({ order, callback }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const approveHandler = (values) => {
    contractsService
      .editContract(order._id, {
        machines: values.machines,
        status: 'approved',
      })
      .then(closeModal())
      .then(callback())
      .catch((err) => {
        console.log(err);
      });
      // MUST ADD SPINNER its working atleast in the admin page
  };

  const { values, onChange, onSubmit } = useForm(approveHandler, {
    machines: '',
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // const {role} = useContext(AuthContext);
  const approve = () => {
    // if (role !== 'admin') {
    //   return;
    // }
    console.log('from approved     >' + order._id);

    openModal();
    /*
    Add modal with input field for machine
    Open modal
    add machine
    send patch request
    close modal
    refresh state of orders
    */
  };

  const complete = () => {
    if (order.status !== 'approved') {
      return;
    }

    contractsService
      .editContract(order._id, { status: 'complete' })
      .then(callback())
      .catch((err) => {
        console.log(err);
      });

    /*
    send patch request to update status to complete
    refresh state of orders
    */
  };

  const deny = () => {
    // if (role !== 'admin') {
    //   return;
    // }

    const confirmed = confirm('are you sure');
    if (!confirmed) {
      return;
    }

    contractsService
      .editContract(order._id, { machines: '', status: 'denied' })
      .then(callback())
      .catch((err) => {
        console.log(err);
      });

    /*
    send patch request to update status to denied
    refresh state of orders
    */
  };

  const del = () => {
    const confirmed = confirm('are you sure');

    if (!confirmed) {
      return;
    }

    contractsService
      .delContract(order._id)
      .then(callback())
      .catch((err) => {
        console.log(err);
      });
    /*
    send delete request to delete order
    refresh state of orders
    */
  };

  return (
    <div className={styles.orderCard}>
      <h3>{order.objective}</h3>

      <p>
        <strong>Weight:</strong> {order.weightTons}
      </p>
      <p>
        <strong>Distance in KM:</strong> {order.distanceKM}
      </p>
      <p>
        <strong>Order Date:</strong> {order.date}
      </p>
      <p>
        <strong>Location:</strong> {order.address}
      </p>
      <p>
        <strong>Contact Phone:</strong> {order.phone}
      </p>
      <p>
        <strong>Contract Duration:</strong> {order.duration}
      </p>
      <p>
        <strong>Description:</strong> {order.description}
      </p>
      {order.machines && (
        <p>
          <strong>Assigned machine:</strong> {order.machines}
        </p>
      )}
      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <div className={styles.actionButtons}>
        <button
          disabled={order.status === 'approved' ? true : false}
          onClick={approve}
        >
          Approve
        </button>
        <button disabled={order.status !== 'approved'} onClick={complete}>
          Complete
        </button>
        <button onClick={deny}>Deny</button>
        <button onClick={del}>Delete</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalCont}>
          <h2>Approve Order</h2>
          <form onSubmit={onSubmit}>
            <div className={styles.inputBox}>
              <label htmlFor="machines">Assign a machine to the order:</label>
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
      </Modal>
    </div>
  );
};

export default OrderCard;

/*
TODO:
- Add spinner in pending status

- Add interaction buttons with conditional statements
::::: - add auth context to get role
      - make 2 groups of buttons for admin and user
      - 
*/
