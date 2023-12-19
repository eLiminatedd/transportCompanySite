import { Link } from 'react-router-dom';
import styles from './Equipment.module.css';

import { useCallback, useEffect, useState } from 'react';
import * as equipmentService from '../../services/equipmentService';
import Paginator from '../paginator/Paginator';
import Spinner from '../spinner/Spinner';


const Equipment = () => {
  const [machines, setMachines] = useState([]);
  const [currentMachines, setCurrentMachines] = useState([]);

  const itemsPerPage = 4; 
  const totalItems = machines.length ? machines.length : 0; 
  const [isLoading, setLoading] = useState(true);


  const getCurrentItems = useCallback(
    (start, end) => {
      setCurrentMachines(machines.slice(start, end));
    },
    [machines]
  );

  useEffect(() => {
    equipmentService
      .getMachines()
      .then((result) => setMachines(result))
      .catch((err) => {
        console.log(err);
      });
  }, [machines]);

  useEffect(() => {
    setLoading(false);
  }, [machines]);

  useEffect(() => {
    setLoading(false);
  }, [currentMachines]);

  if (!machines) {
    setLoading(true);
  }

  if (!currentMachines) {
    return <h2>No machines added yet...</h2>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.machines}>
      <h2 className={styles.heading}>Equipment Information:</h2>


      <Paginator
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        callback={getCurrentItems}
      >

        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.cardContainer}>
            {currentMachines.map((machine) => (
              <Link key={machine._id} to={`/equipment/${machine._id}`}>
                <div className={styles.card}>
                  <img src={machine.img} alt={machine.machineName} />
                  <div className={styles.cardContent}>
                    <h3>{machine.machineName}</h3>
                    <p>{machine.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </Paginator>
    </div>
  );
};

export default Equipment;
