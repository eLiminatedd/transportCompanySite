/* eslint-disable react/prop-types */
import styles from './OrderCard.module.css';
import * as contractsService from '../../services/contractsService.js';
import * as testimonialsService from '../../services/testimonialsService.js';
import Modal from 'react-modal';
import ApproveOrderForm from '../approveOrderForm/ApproveOrderForm.jsx'
import ReviewOrderForm from '../reviewForm/reviewForm.jsx'
import AuthContext from '../../context/AuthContext';

import { useState, useContext } from 'react';

Modal.setAppElement('#root');

// add orderCard module css for ordercard styles
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
      contract: order._id
    }
    testimonialsService.createTestimonial(testimonial)
      .then(contractsService.editContract(order._id, {
        status: 'reviewed',
      })
        .then(callback())
        .then(closeReviewForm())
        .catch((err) => {
          console.log(err);
        })
      ).catch((err) => {
        console.log(err);
      });
  }

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
    // MUST ADD SPINNER its working atleast in the admin page
  };

  const approve = () => {
    // if (role !== 'admin') {
    //   return;
    // }
    console.log('from approved     >' + order._id);

    openMachineForm();
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

  const createTestimonial = () => {

    openReviewForm();

    // open modal with form that has textarea for description



  }

  const borderStyle = (status) => {
    if (status === 'pending') return { borderColor: 'Orange' }
    if (status === 'approved') return { borderColor: 'Blue' }
    if (status === 'denied') return { borderColor: 'Red' }
    if (status === 'complete') return { borderColor: 'Green' }
    if (status === 'reviewed') return { borderColor: 'Black', backgroundColor: '#e5a8fd85' }
  }


  return (
    <div className={styles.orderCard} style={borderStyle(order.status)} >
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
        {role === 'Admin' ? (
          <>
            {order.status === 'pending' ? (
              <>
                <button
                  style={{ backgroundColor: 'Blue' }}
                  disabled={order.status === 'approved' ? true : false}
                  onClick={approve}>
                  Approve
                </button>

                <button
                  onClick={deny}
                  style={{ backgroundColor: 'Red' }}>
                  Deny
                </button>
              </>
            ): null}

            <button
              onClick={del}
              style={{ backgroundColor: 'Red' }}>
              Delete
            </button>
          </>
        ): null}

        {order.status !== 'denied' & order.status !== 'reviewed' & order.status !== 'pending' & order.status !== 'complete' ? (

          <button
            style={{ backgroundColor: 'Green' }}
            disabled={order.status !== 'approved'}
            onClick={complete}>
            Complete
          </button>
        ): null}



        {/* {role === 'User' & order.status === 'complete' ? ( */}
        {order.status === 'complete' ? (
        <button
          onClick={createTestimonial}
          style={{ backgroundColor: 'Purple' }}>
          Give Feedback
        </button>
        ): null}
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
    </div >
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