/* eslint-disable react/prop-types */
import styles from './OrderPage.module.css';

const OrderCard = ({ order }) => {
  return (
    <div className={styles.orderCard}>
      <h3>{order.productName}</h3>
      <p>
        <strong>Quantity:</strong> {order.quantity}
      </p>
      <p>
        <strong>Customer Name:</strong> {order.customerName}
      </p>
      <p>
        <strong>Shipping Address:</strong> {order.shippingAddress}
      </p>
      <p>
        <strong>Order Date:</strong> {order.orderDate}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
    </div>
  );
};

export default OrderCard;