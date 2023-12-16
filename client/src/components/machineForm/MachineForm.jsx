/* eslint-disable react/prop-types */

import * as equipmentService from '../../services/equipmentService';
import styles from './MachineForm.module.css';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

// callback(values, apicall)

const MachineForm = (props) => {
  const navigate = useNavigate();

  const machineFormHandler = (values) => {
    const data = {
      machineName: values.machineName,
      img: values.img,
      attrOne: values.attrOne,
      attrTwo: values.attrTwo,
      attrThree: values.attrThree,
      attrFour: values.attrFour,
      attrFive: values.attrFive,
      attrSix: values.attrSix,
      description: values.description,
    };
    if (props.id) {
      equipmentService
        .editMachine(props.id, data)
        .then(props.callback())
        .then(props.modalHandler())
        .catch((err) => {
          console.log(err);
        });
         
    } else {
      equipmentService
        .createMachine(data)
        .then(navigate('/equipment/'))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { values, onChange, onSubmit } = useForm(machineFormHandler, {
    machineName: props.initData.machineName,
    img: props.initData.img,
    attrOne: props.initData.attrOne,
    attrTwo: props.initData.attrTwo,
    attrThree: props.initData.attrThree,
    attrFour: props.initData.attrFour,
    attrFive: props.initData.attrFive,
    attrSix: props.initData.attrSix,
    description: props.initData.description,
  });

  return (
    <div className={styles.machineFormContainer}>
      <h2>{props.id ? 'Edit Machine' : 'Create Machine'}</h2>
      <form onSubmit={onSubmit} className={styles.machineForm}>
        <div className={styles.inputBox}>
          <label htmlFor="machineName">Machine Name:</label>
          <input
            type="text"
            id="machineName"
            name="machineName"
            value={values.machineName}
            onChange={onChange}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="img">Image Url:</label>
          <input
            type="text"
            id="img"
            name="img"
            value={values.img}
            onChange={onChange}
            required
            autoComplete="photo"
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="attrOne">Attribute One:</label>
          <input
            type="text"
            id="attrOne"
            name="attrOne"
            value={values.attrOne}
            onChange={onChange}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="attrTwo">Attribute Two:</label>
          <input
            type="text"
            id="attrTwo"
            name="attrTwo"
            value={values.attrTwo}
            onChange={onChange}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="attrThree">Attribute Three:</label>
          <input
            type="text"
            id="attrThree"
            name="attrThree"
            value={values.attrThree}
            onChange={onChange}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="attrFour">Attribute Four:</label>
          <input
            type="text"
            id="attrFour"
            name="attrFour"
            value={values.attrFour}
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="attrFive">Attribute Five:</label>
          <input
            type="text"
            id="attrFive"
            name="attrFive"
            value={values.attrFive}
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="attrSix">Attribute Six:</label>
          <input
            type="text"
            id="attrSix"
            name="attrSix"
            value={values.attrSix}
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="description">Description:</label>
          <textarea
            className={styles.txtArea}
            id="description"
            name="description"
            value={values.description}
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <button type="submit">
          {props.id ? 'Edit Machine' : 'Create Machine'}
        </button>
      </form>
    </div>
  );
};

export default MachineForm;
