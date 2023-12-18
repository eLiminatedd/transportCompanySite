import { useCallback, useEffect, useState } from 'react';
import * as contractsService from '../../services/contractsService';
import dateFunc from '../../lib/dateFormater';
import Modal from 'react-modal';
import OrderCard from '../orderCard/OrderCard';
import styles from './OrderPage.module.css';
import useForm from '../../hooks/useForm';
import Paginator from '../paginator/Paginator';

Modal.setAppElement('#root');

const OrderPage = () => {
  const orderHandler = async (values) => {
    const result = await contractsService.createContract({
      objective: values.objective,
      weightTons: Number(values.weightTons),
      distanceKM: Number(values.distanceKM),
      date: `From ${values.whenDateStart} untill ${values.whenDateEnd}`,
      whenDateStart: values.whenDateStart,
      whenDateEnd: values.whenDateEnd,
      address: values.address,
      phone: values.phone,
      contactInfo: values.contactInfo,
      duration: values.duration,
      description: values.description,
      machines: '',
      status: 'pending',
    });
    refreshState();
    closeModal();

    console.log(result);
  };

  const { values, onChange, onSubmit } = useForm(orderHandler, {
    objective: '',
    weightTons: 0,
    distanceKM: 0,
    date: '',
    whenDateStart: dateFunc(false),
    whenDateEnd: '',
    address: '',
    phone: '',
    contactInfo: '',
    duration: '',
    description: '',
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const [currentOrders, setCurrentOrders] = useState([]);
  const [reviewedOrders, setReviewedOrders] = useState([]);
  const [currentPaginatedOrders, setCurrentPaginatedOrders] = useState([]);
  const [reviewedPaginatedOrders, setReviewedPaginatedOrders] = useState([]);
  const itemsPerPage = 3; // Set the number of items per page

  const getCurrentOrders = useCallback(
    (start, end) => {
      setCurrentPaginatedOrders(currentOrders.slice(start, end));
    },
    [currentOrders]
  );

  const getReviewedOrders = useCallback(
    (start, end) => {
      setReviewedPaginatedOrders(reviewedOrders.slice(start, end));
    },
    [reviewedOrders]
  );

  const refreshState = useCallback(() => {
    contractsService
      .getOwnContracts()
      .then((result) => {
        const reviewed = result.filter((order) => order.status === 'reviewed');
        const current = result.filter((order) => order.status !== 'reviewed');
        console.log(result);
        setReviewedOrders(reviewed);
        setCurrentOrders(current);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    refreshState();
  }, [refreshState, currentOrders, reviewedOrders]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
        <div className={styles.modalCont}>
          <h2>Add Order</h2>
          <form onSubmit={onSubmit}>
            <div className={styles.formBox}>
              <div className={styles.inputBox}>
                <label htmlFor="objective">Request objective name:</label>
                <input
                  type="text"
                  id="objective"
                  name="objective"
                  value={values.objective}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />

                <label htmlFor="weightTons">Weight in tons:</label>
                <input
                  type="number"
                  id="weightTons"
                  name="weightTons"
                  value={values.weightTons}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
              </div>

              <div className={styles.inputBox}>
                <label htmlFor="distanceKM">Distance in Kilometres:</label>
                <input
                  type="number"
                  id="distanceKM"
                  name="distanceKM"
                  value={values.distanceKM}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
                <div className={styles.dateBox}>
                  <div className={styles.dateField}>
                    <label htmlFor="whenDateStart">Start Date:</label>
                    <input
                      type="date"
                      id="whenDateStart"
                      name="whenDateStart"
                      value={values.whenDateStart}
                      onChange={onChange}
                      min={dateFunc(false)}
                      max={dateFunc(true)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className={styles.dateField}>
                    <label htmlFor="whenDateEnd">End Date:</label>
                    <input
                      type="date"
                      id="whenDateEnd"
                      name="whenDateEnd"
                      value={values.whenDateEnd}
                      onChange={onChange}
                      min={dateFunc(false)}
                      max={dateFunc(true)}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.inputBox}>
                <label htmlFor="address">Location:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />

                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
              </div>

              <div className={styles.inputBox}>
                <label htmlFor="contactInfo">Client Info:</label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={values.contactInfo}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />

                <label htmlFor="duration">Contract Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={values.duration}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
              </div>

              <div className={styles.inputBox}>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
              </div>

              <button className={styles.sbmtBtn} type="submit">
                Submit
              </button>
            </div>
          </form>
          <button onClick={closeModal} className={styles.sbmtBtn}>
            Close
          </button>
        </div>
      </Modal>

      <h2 className={styles.pageHeader}>My current orders</h2>

      <Paginator
        totalItems={currentOrders.length}
        itemsPerPage={itemsPerPage}
        callback={getCurrentOrders}
      >
        <div className={styles.orderContainer}>
          {currentPaginatedOrders.map((order) => {
            return (
              <OrderCard
                callback={refreshState}
                key={order._id}
                order={order}
              />
            );
          })}
        </div>
      </Paginator>

      <h2 className={styles.pageHeader}>Reviewed orders</h2>

      <Paginator
        totalItems={reviewedOrders.length}
        itemsPerPage={itemsPerPage}
        callback={getReviewedOrders}
      >
        <div className={styles.orderContainer} style={{ fontSize: '0.8rem' }}>
          {reviewedPaginatedOrders.map((order) => {
            return (
              <OrderCard
                callback={refreshState}
                key={order._id}
                order={order}
              />
            );
          })}
        </div>
      </Paginator>
    </div>
  );
};

export default OrderPage;
