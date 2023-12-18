import { useCallback, useEffect, useState } from 'react';
import * as contractsService from '../../services/contractsService';
import * as testimonialsService from '../../services/testimonialsService';
import Paginator from '../paginator/Paginator';
import MachineForm from '../machineForm/MachineForm';
import OrderCard from '../orderCard/OrderCard';
import styles from './AdminPage.module.css';
import TestimonialCard from '../testimonialsCard/TestimonialsCard';

const AdminPage = () => {

  const [orders, setOrders] = useState([]);
  const [testimonials, setTestimonials] = useState([]);


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


  const refreshState = useCallback(() => {
    // change it to getCurrentContracts Later
    contractsService
      .getContracts()
      .then((result) => {
        console.log(result);
        const fltrd = result.filter((order) => order.status !== 'reviewed');
        setOrders(fltrd);
      })
      .then(testimonialsService.getTestimonials()
        .then((result) => {
          console.log(result);
          const fltrd = result.filter((testimonial) => testimonial.status === 'pending');
          setTestimonials(fltrd);
        })).catch((err) => {
          console.log(err);
        })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    refreshState();
  }, [refreshState, orders, testimonials]);


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

      <Paginator
        totalItems={orders.length}
        itemsPerPage={3}
        callback={getCurrentOrders}
      >
        <div className={styles.ordersContainer}>
        {currentOrders.map((order) => {
          return (
          <OrderCard
            callback={refreshState}
            key={order._id}
            order={order}
          />
        );})}
      </div>
      </Paginator>



     

      <hr />
      {/* Testimonials Container */}
      <h2>Testimonials</h2>


      <Paginator
        totalItems={testimonials.length}
        itemsPerPage={4}
        callback={getTestimonials}
      >
      <div className={styles.testimonialsContainer}>
        {/* Testimonial cards go here */}

        {currentTestimonials.map((testimonial) => {
          return (
            <TestimonialCard
              callback={refreshState}
              key={testimonial._id}
              testimonial={testimonial}
            />
          );
        })}

      </div>
      </Paginator>
    </div>
  );
};

export default AdminPage;
