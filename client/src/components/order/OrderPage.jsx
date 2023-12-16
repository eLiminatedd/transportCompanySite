import { useCallback, useEffect, useState } from 'react';
import * as contractsService from '../../services/contractsService';

import Modal from 'react-modal';
import OrderCard from './OrderCard';
import styles from './OrderPage.module.css';
import useForm from '../../hooks/useForm';

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
    closeModal();

    console.log(result);
  };

  const dateFunc = (dateEnd) => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cYear = currentDate.getFullYear();
    let cMonth = currentDate.getMonth();
    if (dateEnd) {
      cMonth = currentDate.getMonth() + 3;
    } else {
      cMonth = cMonth + 1;
    }
    if (cMonth > 12) {
      cMonth = cMonth - 12;
      cYear = cYear + 1;
    }

    if (cMonth < 10) {
      cMonth = '0' + cMonth;
    }
    if (cDay < 10) {
      cDay = '0' + cDay;
    }

    console.log('dates ' + cYear + '-' + cMonth + '-' + cDay);
    return cYear + '-' + cMonth + '-' + cDay;
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
    // machines: '',
    // status: '',
    // choose date Format
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const [orders, setOrders] = useState([]);

  const refreshState = useCallback(() => {
    contractsService
      .getOwnContracts()
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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setOrders((prevOrders) => [...prevOrders, formData]);
  //   closeModal();
  // };

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

      <div className={styles.orderContainer}>
        {orders.map((order) => (
          <OrderCard callback={refreshState} key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
