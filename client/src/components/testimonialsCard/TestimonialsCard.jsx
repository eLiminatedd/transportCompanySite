/* eslint-disable react/prop-types */
import styles from './TestimonialCard.module.css'
import * as testimonialsService from '../../services/testimonialsService';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';


const TestimonialCard = ({ testimonial, callback }) => {
    const { role } = useContext(AuthContext);

    const publish = () => {
        testimonialsService.editTestimonial(testimonial._id, { status: 'approved' })
            .then(callback())
            .catch((err) => {
                console.log(err);
            });
    }

    const del = () => {
        const confirmed = confirm('are you sure')
        if (!confirmed) {
            return
        }

        testimonialsService.delTestimonial(testimonial._id)
            .then(callback())
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={styles.testimonialCard}>
            <h2>
                {testimonial.description}
            </h2>
            <p>- {testimonial.name}</p>
            <p>- {testimonial.status}</p>
            <p>Contract: {testimonial.objective} - {testimonial.weightTons}Tons  </p>
            {role === 'Admin' ? (
                <div className={styles.actionBtns}>
                    <button onClick={publish}style={{ backgroundColor: 'Green' }}>Publish</button>
                    <button onClick={del} style={{ backgroundColor: 'Red' }}>Delete</button>
                </div>
            ) : null}

        </div>
    )
}

export default TestimonialCard