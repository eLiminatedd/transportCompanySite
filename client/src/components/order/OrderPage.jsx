import { useState } from 'react';
import Modal from 'react-modal';
import OrderCard from './OrderCard';
import styles from './OrderPage.module.css';


Modal.setAppElement('#root');

const OrderPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    customerName: '',
    shippingAddress: '',
    orderDate: '',
    status: 'ongoing', // Default status
  });
  const [orders, setOrders] = useState([]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrders((prevOrders) => [...prevOrders, formData]);
    closeModal();
  };

  return (
    <div className={styles.orderPage}>
       <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Order Management</h1>
          <p>Manage your orders efficiently.</p>
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={openModal}>Add Order</button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Add Order</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Shipping Address:
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Order Date:
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="ongoing">Ongoing</option>
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <div className={styles.orderContainer}>
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;