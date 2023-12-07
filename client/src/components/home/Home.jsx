import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.hero} >
      <div className={styles.heroContent}>
        <h1>Something heavy needs lifting</h1>
        <p>Look no further Call us now !!!</p>
      </div>
    </div>
  );
};

export default Home;