import { useState } from 'react';


import Modal from 'react-modal';
import OrderCard from '../order/OrderCard';
import styles from './AdminPage.module.css';


Modal.setAppElement('#root');

const AdminPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [additionalAttribute, setAdditionalAttribute] = useState('');
  const [machineFormData, setMachineFormData] = useState({
    // Machine creation form data
    machineName: '',
    // Add more fields as needed
  });
  const [orders, setOrders] = useState([
    // Sample orders, similar to the OrderPage
   { productName: 'as',
    quantity: '2',
    customerName: '443',
    shippingAddress: '232',
    orderDate: '2222',
    status: 'ongoing', },
    { productName: 'aadsss',
    quantity: '1',
    customerName: '443',
    shippingAddress: '232',
    orderDate: '22',
    status: 'ongoing', },
    { productName: 'ff',
    quantity: '23',
    customerName: '4432',
    shippingAddress: '232',
    orderDate: '22232',
    status: 'ongoing', }

  ]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleMachineFormChange = (e) => {
    const { name, value } = e.target;
    setMachineFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdditionalAttributeChange = (e) => {
    setAdditionalAttribute(e.target.value);
  };

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

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageContainer}>
        {/* Machine Creation Form Container */}
        <div className={styles.machineFormContainer}>
          <h2>Create Machine</h2>
          <form>
            <label>
              Machine Name:
              <input
                type="text"
                name="machineName"
                value={machineFormData.machineName}
                onChange={handleMachineFormChange}
                required
              />
            </label>
            {/* Add more fields as needed */}
            <button type="submit">Create Machine</button>
          </form>
        </div>

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
        {orders.map((order, index) => (
          <OrderCard
            key={index}
            order={order}
            onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)}
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
          <p>Great service! The machines were delivered on time and in perfect
            condition.</p>
          <p>- John Doe</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;