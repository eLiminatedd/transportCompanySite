import { useCallback, useEffect, useState } from 'react';
import * as contractsService from '../../services/contractsService';
import * as testimonialsService from '../../services/testimonialsService';

import MachineForm from '../machineForm/MachineForm';
import OrderCard from '../orderCard/OrderCard';
import styles from './AdminPage.module.css';
import TestimonialCard from '../testimonialsCard/TestimonialsCard';

const AdminPage = () => {

  const [orders, setOrders] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const refreshState = useCallback(() => {
    // change it to getCurrentContracts Later
    contractsService
      .getContracts()
      .then((result) => {
        console.log(result);
        setOrders(result);
      })
      .then(testimonialsService.getTestimonials()
        .then((result) => {
          console.log(result);
          setTestimonials(result)
        })).catch((err) => {
          console.log(err);
        })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    refreshState();
  }, [refreshState]);


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
          <p className={styles.describe}>
            This is a description of the admin page. Provide information or
            instructions here.
          </p>
        </div>
      </div>

      {/* Orders Container */}
      <hr />
      <h2>Manage Orders</h2>
      <div className={styles.ordersContainer}>
        {orders.map((order) => {
          if (order.status === 'reviewed') {
            return;
          }
          return (
          <OrderCard
            callback={refreshState}
            key={order._id}
            order={order}
          />
        )})}
      </div>

      <hr />
      {/* Testimonials Container */}
      <h2>Testimonials</h2>
      <div className={styles.testimonialsContainer}>
        {/* Testimonial cards go here */}

        {testimonials.map((testimonial) => {
          if (testimonial.status !== 'pending') {
            return;
          }
          return (
            <TestimonialCard
              callback={refreshState}
              key={testimonial._id}
              testimonial={testimonial}
            />
          )
        })}

      </div>
    </div>
  );
};

export default AdminPage;
