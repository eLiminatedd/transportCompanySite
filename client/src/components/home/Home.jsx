import styles from './Home.module.css';
import { useCallback, useEffect, useState } from 'react';
import TestimonialCard from '../testimonialsCard/TestimonialsCard';
import * as testimonialsService from '../../services/testimonialsService';
import Paginator from '../paginator/Paginator';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
  const [totalTestimonials, setTotalTestimonials] = useState([]);
  const [currentTestimonials, setCurrentTestimonials] = useState([]);
  const itemsPerPage = 4; // Set the number of items per page
  const totalItems = totalTestimonials.length; // Set the total number of items
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [totalTestimonials]);

  useEffect(() => {
    setLoading(false);
  }, [currentTestimonials]);

  if (!totalTestimonials) {
    setLoading(true);
  }

  const fitlerResource = (resource) => {
    const filtered = resource.filter((res) => res.status !== 'pending');
    return filtered;
  };

  const getCurrentItems = useCallback(
    (start, end) => {
      setCurrentTestimonials(totalTestimonials.slice(start, end));
    },
    [totalTestimonials]
  );

  useEffect(() => {
    testimonialsService
      .getTestimonials()
      .then((result) => {
        const newRes = fitlerResource(result);
        console.log(result);
        setTotalTestimonials(newRes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Something heavy needs lifting</h1>
        <p>Look no further </p>
        <p>Call us now !!!</p>
        <div className={styles.phoneCont}>
          <span className={styles.phones}>+359 58 66 03 47</span>
          <span className={styles.phones}>+359 888 30 70 11</span>
          <span className={styles.phones}>+359 886 85 29 55</span>
        </div>
          <Link className={styles.machineFleet} to="/equipment">View Our Machine Fleet</Link>
      </div>

      <div className={styles.testimonialSection}>
        <h2>Client Testimonials</h2>

        {currentTestimonials ? (
          <Paginator
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            callback={getCurrentItems}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <div className={styles.testimonialsContainer}>
                {/* Testimonial cards go here */}
                {currentTestimonials.map((testimonial) => {
                  return (
                    <TestimonialCard
                      callback={null}
                      key={testimonial._id}
                      testimonial={testimonial}
                    />
                  );
                })}
              </div>
            )}
          </Paginator>
        ) : (
          <p>No testimonials added yet</p>
        )}
      </div>
    </div>
  );
};

export default Home;
