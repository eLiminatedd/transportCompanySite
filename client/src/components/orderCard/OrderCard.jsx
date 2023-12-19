/* eslint-disable react/prop-types */
import styles from './OrderCard.module.css';
import * as contractsService from '../../services/contractsService.js';
import * as testimonialsService from '../../services/testimonialsService.js';
import Modal from 'react-modal';
import ApproveOrderForm from '../approveOrderForm/ApproveOrderForm.jsx';
import ReviewOrderForm from '../reviewForm/reviewForm.jsx';
import AuthContext from '../../context/AuthContext';
import Spinner from '../spinner/Spinner';

import { useState, useContext } from 'react';

Modal.setAppElement('#root');

const OrderCard = ({ order, callback }) => {
  const { role } = useContext(AuthContext);

  const [isAddMachineOpen, setMachineFormOpen] = useState(false);
  const [isReviewFormOpen, setReviewFormOpen] = useState(false);
  const openMachineForm = () => setMachineFormOpen(true);
  const closeMachineForm = () => setMachineFormOpen(false);

  const openReviewForm = () => setReviewFormOpen(true);
  const closeReviewForm = () => setReviewFormOpen(false);
  // const {role} = useContext(AuthContext);

  const reviewHandler = (values) => {
    const testimonial = {
      name: order.contactInfo,
      objective: order.objective,
      weightTons: order.weightTons,
      description: values.description,
      status: 'pending',
      contract: order._id,
    };
    testimonialsService
      .createTestimonial(testimonial)
      .then(
        contractsService
          .editContract(order._id, {
            status: 'reviewed',
          })
          .then(callback())
          .then(closeReviewForm())
          .catch((err) => {
            console.log(err);
          })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const approveHandler = (values) => {
    contractsService
      .editContract(order._id, {
        machines: values.machines,
        status: 'approved',
      })
      .then(callback())
      .then(closeMachineForm())
      .catch((err) => {
        console.log(err);
      });
  };

  const approve = () => {
    // if (role !== 'admin') {
    //   return;
    // }
    console.log('from approved     >' + order._id);
    openMachineForm();
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
  };

  const createTestimonial = () => {
    openReviewForm();
  };

  const borderStyle = (status) => {
    if (status === 'pending') {
      return { borderColor: 'Orange' };
    }
    if (status === 'approved') {
      return { borderColor: 'Blue' };
    }
    if (status === 'denied') {
      return { borderColor: 'Red' };
    }
    if (status === 'complete') {
      return { borderColor: 'Green' };
    }
    if (status === 'reviewed') {
      return { borderColor: 'Black', backgroundColor: '#e5a8fd85' };
    }
  };

  return (
    <div className={styles.orderCard} style={borderStyle(order.status)}>
      <div className={styles.heading}>
        <h3>{order.objective}</h3>
        {order.status === 'pending' ? (<Spinner width='2rem' height='2rem' />) : null}
      </div>
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
      {/* <p>
        <strong>Status:</strong> {order.status}
      </p> */}

      <div className={styles.actionButtons}>
        {role === 'Admin' ? (
          <>
            {order.status === 'pending' ? (
              <>
                <button
                  style={{ backgroundColor: 'Blue' }}
                  disabled={order.status === 'approved' ? true : false}
                  onClick={approve}
                >
                  Approve
                </button>

                <button onClick={deny} style={{ backgroundColor: 'Red' }}>
                  Deny
                </button>
              </>
            ) : null}

            <button onClick={del} style={{ backgroundColor: 'Red' }}>
              Delete
            </button>
          </>
        ) : null}

        {(order.status !== 'denied') &
        (order.status !== 'reviewed') &
        (order.status !== 'pending') &
        (order.status !== 'complete') ? (
          <button
            style={{ backgroundColor: 'Green' }}
            disabled={order.status !== 'approved'}
            onClick={complete}
          >
            Complete
          </button>
        ) : null}

        {/* {role === 'User' & order.status === 'complete' ? ( */}
        {order.status === 'complete' ? (
          <button
            onClick={createTestimonial}
            style={{ backgroundColor: 'Purple' }}
          >
            Give Feedback
          </button>
        ) : null}
      </div>

      <Modal
        isOpen={isAddMachineOpen}
        onRequestClose={closeMachineForm}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <ApproveOrderForm callback={approveHandler} />
      </Modal>

      <Modal
        isOpen={isReviewFormOpen}
        onRequestClose={closeReviewForm}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <ReviewOrderForm callback={reviewHandler} />
      </Modal>
    </div>
  );
};

export default OrderCard;
