import styles from './Home.module.css';
import { useCallback, useEffect, useState } from 'react';
import TestimonialCard from '../testimonialsCard/TestimonialsCard';
import * as testimonialsService from '../../services/testimonialsService';
import Paginator from '../paginator/Paginator';

const Home = () => {
  const [totalTestimonials, setTotalTestimonials] = useState([]);
  const [currentTestimonials, setCurrentTestimonials] = useState([]);
  const itemsPerPage = 4; // Set the number of items per page
  const totalItems = totalTestimonials.length; // Set the total number of items

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
  }, [totalTestimonials]);

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Something heavy needs lifting</h1>
        <p>Look no further Call us now !!!</p>
      </div>

      <div className={styles.testimonialSection}>
        <h2>Client Testimonials</h2>

        <Paginator totalItems={totalItems} itemsPerPage={itemsPerPage} callback={getCurrentItems}>
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
        </Paginator>
      </div>
    </div>
  );
};

export default Home;
