import { Link } from 'react-router-dom';
import styles from './Equipment.module.css';
import { useEffect, useState } from 'react';
import * as equipmentService from '../../services/equipmentService';


// const machinesData = [
//   {
//     id: 1,
//     title: 'Machine 1',
//     image: 'machine1.jpg',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     id: 2,
//     title: 'Machine 2',
//     image: 'machine2.jpg',
//     description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//   },
//   {
//     id: 3,
//     title: 'Machine 2',
//     image: 'machine2.jpg',
//     description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//   },
//   {
//     id: 4,
//     title: 'Machine 2',
//     image: 'machine2.jpg',
//     description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//   },
//   {
//     id: 5,
//     title: 'Machine 2',
//     image: 'machine2.jpg',
//     description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//   },
//   {
//     id: 6,
//     title: 'Machine 2',
//     image: 'machine2.jpg',
//     description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//   },
//   // Add more machines as needed
// ];

const Equipment = () => {

  const [machines, setMachines] = useState([]);
  
  useEffect(() => {
    equipmentService.getMachines()
      .then(result => setMachines(result))
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.machines}>
      <h2 className={styles.heading}>Equipment Information:</h2>
      <div className={styles.cardContainer}>
        {machines.map((machine) => (
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
    </div>
  );
};

export default Equipment;