/* eslint-disable react/prop-types */
import styles from './TestimonialCard.module.css';
import * as testimonialsService from '../../services/testimonialsService';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import Spinner from '../spinner/Spinner';

const TestimonialCard = ({ testimonial, callback }) => {
  const { role } = useContext(AuthContext);

  const publish = () => {
    testimonialsService
      .editTestimonial(testimonial._id, { status: 'approved' })
      .then(callback())
      .catch((err) => {
        console.log(err);
      });
  };

  const del = () => {
    const confirmed = confirm('are you sure');
    if (!confirmed) {
      return;
    }

    testimonialsService
      .delTestimonial(testimonial._id)
      .then(callback())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialImageContainer}>

        {testimonial.status === 'pending' ? (
          <Spinner width="3rem" height="3rem" />
        ) : (
          <img
            src={
              'https://cdn.pixabay.com/photo/2016/03/31/20/37/client-1295901_1280.png'
            }
            alt={'testimonialImage'}
            className={styles.testimonialImage}
          />
        )}
      </div>
      <div>
        <h2>{testimonial.description}</h2>
        <p>- {testimonial.name}</p>
        <p>
          Contract: {testimonial.objective} - {testimonial.weightTons}Tons{' '}
        </p>

      </div>
      {(role === 'Admin') & (testimonial.status === 'pending') ? (
        <div className={styles.actionBtns}>
          <button onClick={publish} style={{ backgroundColor: 'Green' }}>
            Publish
          </button>
          <button onClick={del} style={{ backgroundColor: 'Red' }}>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TestimonialCard;
