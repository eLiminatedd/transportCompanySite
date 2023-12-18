/*

Get id from router
Get machine from server
Display machine

*/
import Modal from 'react-modal';

import MachineForm from '../machineForm/MachineForm';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as equipmentService from '../../services/equipmentService';
import styles from './MachineDetails.module.css';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const MachineDetails = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { machineId } = useParams();
  const [machineDetails, setMachineDetails] = useState(null);
  const navigate = useNavigate();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const refreshState = useCallback(() => {
    equipmentService
      .getOneMachine(machineId)
      .then((result) => {
        console.log(result);
        setMachineDetails(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [machineId]);

  useEffect(() => {
    refreshState();
  }, [machineDetails, refreshState]);

  if (!machineDetails) {
    return <p>Loading...</p>; // You can customize the loading indicator
  }
  //   add suspense for a spinner and remove the above if statement later

  const handleDelete = async () => {
    try {
      await equipmentService.delMachine(machineId);
      navigate('/equipment');
    } catch (error) {
      console.error('Error deleting machine:', error.message);
    }
  };

  return (
    <div className={styles.machineDetailsContainer}>
      <div className={styles.machineDetailsContent}>
        <div>
          <img
            src={machineDetails.img}
            alt={machineDetails.machineName}
            className={styles.machineImage}
          />
        </div>
        <div>
          <h2>{machineDetails.machineName}</h2>
          <p>{machineDetails.description}</p>
          <p>{machineDetails.attrOne}</p>
          <p>{machineDetails.attrTwo}</p>
          <p>{machineDetails.attrThree}</p>
          <p>{machineDetails.attrFour}</p>
          <p>{machineDetails.attrFive}</p>
          <p>{machineDetails.attrSix}</p>
          <div>
            <button onClick={openModal}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          {/* Add more details as needed */}
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <div className={styles.modalCont}>
            <div className={styles.formBox}>
              <MachineForm
                id={machineId}
                modalHandler={closeModal}
                callback={refreshState}
                initData={machineDetails}
              />
            </div>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MachineDetails;
