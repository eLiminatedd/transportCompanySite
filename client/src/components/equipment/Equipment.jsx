import { Link } from 'react-router-dom';
import styles from './Equipment.module.css';
import {useCallback,useEffect, useState } from 'react';
import * as equipmentService from '../../services/equipmentService';
import Paginator from '../paginator/Paginator';

const Equipment = () => {
  const [machines, setMachines] = useState([]);
  const [currentMachines, setCurrentMachines] = useState([]);
  const itemsPerPage = 4; // Set the number of items per page
  const totalItems = machines.length; // Set the total number of items

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

  return (
    <div className={styles.machines}>
      <h2 className={styles.heading}>Equipment Information:</h2>

      <Paginator
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        callback={getCurrentItems}
      >
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
      </Paginator>
    </div>
  );
};

export default Equipment;
