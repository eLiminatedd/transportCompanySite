/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function RoleGuard(props) {
  const { role } = useContext(AuthContext);

  if (role !== 'Admin') {
    return <Navigate to="/error" />;
  }

  return <>{props.children}</>;
}
