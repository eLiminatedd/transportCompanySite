import { useCallback, useEffect, useState } from 'react';
import * as contractsService from '../../services/contractsService';
import * as testimonialsService from '../../services/testimonialsService';
import Paginator from '../paginator/Paginator';
import MachineForm from '../machineForm/MachineForm';
import OrderCard from '../orderCard/OrderCard';
import styles from './AdminPage.module.css';
import TestimonialCard from '../testimonialsCard/TestimonialsCard';
import Spinner from '../spinner/Spinner';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoadingTestimonials, setLoadingTestimonials] = useState(false);
  const [isLoadingOrders, setLoadingOrders] = useState(false);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [currentTestimonials, setCurrentTestimonials] = useState([]);

  const getCurrentOrders = useCallback(
    (start, end) => {
      setCurrentOrders(orders.slice(start, end));
    },
    [orders]
  );

  const getTestimonials = useCallback(
    (start, end) => {
      setCurrentTestimonials(testimonials.slice(start, end));
    },
    [testimonials]
  );

  const refreshOrderState = useCallback(() => {
    // change it to getCurrentContracts Later
    setLoadingOrders(true);
    contractsService
      .getContracts()
      .then((result) => result.filter((order) => order.status !== 'reviewed'))
      .then((fltrdOrders) => setOrders(fltrdOrders))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const refreshTestimonialState = useCallback(() => {
    setLoadingTestimonials(true);
    testimonialsService
      .getTestimonials()
      .then((result) =>
        result.filter((testimonial) => testimonial.status === 'pending')
      )
      .then((fltrdTestimonials) => setTestimonials(fltrdTestimonials))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    refreshOrderState();
  }, [refreshOrderState]);

  useEffect(() => {
    refreshTestimonialState();
  }, [refreshTestimonialState]);

  useEffect(() => {
    setLoadingTestimonials(false);
  }, [testimonials]);

  useEffect(() => {
    setLoadingOrders(false);
  }, [orders]);

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
          <h2 className={styles.describe}>Admin Page Description</h2>
          <p className={styles.describe}>This page can:</p>
          <p>- create entries in the Equipment Page,</p>
          <p>- Manage orders by:</p>
          <p>♣ Approving them</p>
          <p>♣ Denying them</p>
          <p>♣ Deleting them</p>
          <p>♣ Or completing them</p>
          <p>- can also approve or delete testimonials</p>
        </div>
      </div>

      {/* Orders Container */}
      <hr />
      <h2>Manage Orders</h2>

      <Paginator
        totalItems={orders.length}
        itemsPerPage={3}
        callback={getCurrentOrders}
      >
        {isLoadingOrders ? (
          <Spinner />
        ) : (
          <div className={styles.ordersContainer}>
            {currentOrders.map((order) => {
              return (
                <OrderCard
                  callback={refreshOrderState}
                  key={order._id}
                  order={order}
                />
              );
            })}
          </div>
        )}
      </Paginator>

      <hr />
      {/* Testimonials Container */}
      <h2>Testimonials</h2>

      <Paginator
        totalItems={testimonials.length}
        itemsPerPage={4}
        callback={getTestimonials}
      >
        {isLoadingTestimonials ? (
          <Spinner />
        ) : (
          <div className={styles.testimonialsContainer}>
            {currentTestimonials.map((testimonial) => {
              return (
                <TestimonialCard
                  callback={refreshTestimonialState}
                  key={testimonial._id}
                  testimonial={testimonial}
                />
              );
            })}
          </div>
        )}
      </Paginator>
    </div>
  );
};

export default AdminPage;
