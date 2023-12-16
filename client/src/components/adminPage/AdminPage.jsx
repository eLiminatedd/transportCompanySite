import { useCallback, useEffect, useState } from 'react';
import * as contractsService from '../../services/contractsService';

import MachineForm from '../machineForm/MachineForm';
import Modal from 'react-modal';
import OrderCard from '../order/OrderCard';
import styles from './AdminPage.module.css';

Modal.setAppElement('#root');

const AdminPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [additionalAttribute, setAdditionalAttribute] = useState('');

  const [orders, setOrders] = useState([]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAdditionalAttributeChange = (e) => {
    setAdditionalAttribute(e.target.value);
  };

  const refreshState = useCallback(() => {
    // change it to getCurrentContracts Later
    contractsService
      .getContracts()
      .then((result) => {
        console.log(result);
        setOrders(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  const handleAddAttribute = () => {
    // Handle adding the additional attribute to the orders
    // You might want to add validation before modifying the orders state
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        additionalAttribute: additionalAttribute,
      }))
    );
    closeModal();
  };

  const handleStatusChange = (orderId, newStatus) => {
    // Handle changing the status of the order
    // You might want to add validation before modifying the orders state
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const initData = {
    machineName: '',
    img: '',
    attrOne: '',
    attrTwo: '',
    attrThree: '',
    attrFour: '',
    attrFive: '',
    attrSix: '',
    description: '',
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageContainer}>
        <MachineForm id={null} initData={initData} />

        {/* Description Container */}
        <div>
          <h2>Admin Page Description</h2>
          <p>
            This is a description of the admin page. Provide information or
            instructions here.
          </p>
        </div>
      </div>

      {/* Orders Container */}
      <hr />
      <h2>Manage Orders</h2>
      <button onClick={openModal}>Add Additional Attribute</button>
      <div className={styles.ordersContainer}>
        {orders.map((order) => (
          <OrderCard
            callback={refreshState}
            key={order._id}
            order={order}
            onStatusChange={(newStatus) =>
              handleStatusChange(order.id, newStatus)
            }
          />
        ))}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <h2>Add Additional Attribute</h2>
          <label>
            Attribute:
            <input
              type="text"
              value={additionalAttribute}
              onChange={handleAdditionalAttributeChange}
            />
          </label>
          <button onClick={handleAddAttribute}>Add Attribute</button>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>

      <hr />
      {/* Testimonials Container */}
      <h2>Testimonials</h2>
      <div className={styles.testimonialsContainer}>
        {/* Testimonial cards go here */}
        <div className={styles.testimonialCard}>
          <p>
            Great service! The machines were delivered on time and in perfect
            condition.
          </p>
          <p>- John Doe</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
