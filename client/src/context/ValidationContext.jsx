/* eslint-disable react/prop-types */
import { createContext } from 'react';
import { useState } from 'react';

const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
  const [vldErrors, setVldErrors] = useState({});

  const emailValidator = (e) => {
    const email = e.target.value;
    console.log(email);
    if (email === '') {
      setVldErrors((state) => ({
        ...state,
        email: 'Email is required!',
      }));
    } else if (!email.endsWith('@gmail.com')) {
      setVldErrors((state) => ({
        ...state,
        email: 'Email is not valid!',
      }));
    } else {
      if (email) {
        setVldErrors((state) => ({
          ...state,
          email: '',
        }));
      }
    }
  };

  const passwordValidator = (e) => {
    const password = e.target.value;
    console.log(password);
    if (password === '') {
      setVldErrors((state) => ({
        ...state,
        password: 'Password is required!',
      }));
    } else if (password.length < 6) {
      setVldErrors((state) => ({
        ...state,
        password: 'Password should be at least 6 characters long!',
      }));
    } else {
      if (password) {
        setVldErrors((state) => ({
          ...state,
          password: '',
        }));
      }
    }
  };

  const nameValidator = (e) => {
    const name = e.target.value;
    console.log(name);
    if (name === '') {
      setVldErrors((state) => ({
        ...state,
        name: 'Name is required!',
      }));
    } else if (name.length < 4) {
      setVldErrors((state) => ({
        ...state,
        name: 'Name should be at least 4 characters long!',
      }));
    } else {
      if (name) {
        setVldErrors((state) => ({
          ...state,
          name: '',
        }));
      }
    }
  };

  const usernameValidator = (e) => {
    const username = e.target.value;
    console.log(username);
    if (username === '') {
      setVldErrors((state) => ({
        ...state,
        username: 'Username is required!',
      }));
    } else if (username.length < 4) {
      setVldErrors((state) => ({
        ...state,
        username: 'Username should be at least 4 characters long!',
      }));
    } else {
      if (username) {
        setVldErrors((state) => ({
          ...state,
          username: '',
        }));
      }
    }
  };

  const imageValidator = (e) => {
    const image = e.target.value;
    console.log(image);
    if (image === '') {
      setVldErrors((state) => ({
        ...state,
        image: 'Image is required!',
      }));
    } else if (!image?.startsWith('http')) {
      setVldErrors((state) => ({
        ...state,
        image: 'Invalid Image link',
      }));
    } else {
      if (image) {
        setVldErrors((state) => ({
          ...state,
          image: '',
        }));
      }
    }
  };
  const descriptionValidator = (e) => {
    const dsc = e.target.value;
    console.log(dsc);
    if (dsc === '') {
      setVldErrors((state) => ({
        ...state,
        description: 'Description is required!',
      }));
    } else if (dsc.length < 10) {
      setVldErrors((state) => ({
        ...state,
        description: 'Description should be at least 10 characters long!',
      }));
    } else {
      if (dsc) {
        setVldErrors((state) => ({
          ...state,
          description: '',
        }));
      }
    }
  };
  const confPasswordValidator = (e) => {
    const mainPass = document.querySelector('#password').value;
    const confPass = e.target.value;
    console.log(confPass);
    if (confPass === '') {
      setVldErrors((state) => ({
        ...state,
        confirmPassword: 'Confirmed password is required!',
      }));
    } else if (confPass !== mainPass) {
      setVldErrors((state) => ({
        ...state,
        confirmPassword: 'Passwords mismatch!',
      }));
    } else {
      if (confPass) {
        setVldErrors((state) => ({
          ...state,
          confirmPassword: '',
        }));
      }
    }
  };

  
  const phoneValidator = (e) => {
    const phone = e.target.value;
    console.log(phone);
    if (phone === '') {
      setVldErrors((state) => ({
        ...state,
        phone: 'Phone is required!',
      }));
    } else if (phone.length < 6) {
      setVldErrors((state) => ({
        ...state,
        phone: 'Phone should be at least 6 characters long!',
      }));
    } else {
      if (phone) {
        setVldErrors((state) => ({
          ...state,
          phone: '',
        }));
      }
    }
  };

  const attributeValidator = (e) => {
    const attribute = e.target.value;
    console.log(attribute);
    if (attribute === '') {
      setVldErrors((state) => ({
        ...state,
        attribute: 'Attribute is required!',
      }));
    } else if (attribute.length < 4) {
      setVldErrors((state) => ({
        ...state,
        attribute: 'Attribute should be at least 4 characters long!',
      }));
    } else {
      if (attribute) {
        setVldErrors((state) => ({
          ...state,
          attribute: '',
        }));
      }
    }
  };


  const values = {
    emailValidator,
    passwordValidator,
    confPasswordValidator,
    descriptionValidator,
    nameValidator,
    usernameValidator,
    imageValidator,
    phoneValidator,
    attributeValidator,
    vldErrors,
  };

  return (
    <ValidationContext.Provider value={values}>
      {children}
    </ValidationContext.Provider>
  );
};

ValidationContext.displayName = 'ValidationContext';

export default ValidationContext;
