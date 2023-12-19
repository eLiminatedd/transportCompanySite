import './App.css';
import { AuthProvider } from './context/AuthContext';
import { ValidationProvider } from './context/ValidationContext';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/home/Home'));
const OrderPage = lazy(() => import('./components/order/OrderPage'));
const AdminPage = lazy(() => import('./components/adminPage/AdminPage'));
const Equipment = lazy(() => import('./components/equipment/Equipment'));
const MachineDetails = lazy(() =>
  import('./components/machineDetails/MachineDetails')
);

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Spinner from './components/spinner/Spinner';
import AuthGuard from './components/guards/AuthGuard';
import RoleGuard from './components/guards/RoleGuard';
import ErrorBoundary from './components/error/ErrorBoundary';
import ErrorPage from './components/error/ErrorPage';

function App() {
  return (
    <div className="cont">
      <ErrorBoundary>
        <ValidationProvider>
          <AuthProvider>
            <Header />
            <Suspense fallback={<Spinner width={'6rem'} height={'6rem'} />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route
                  path="/equipment/:machineId"
                  element={<MachineDetails />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/error"
                  element={
                    <ErrorPage error={{ status: 404, message: 'Not found' }} />
                  }
                />
                <Route element={<AuthGuard />}>
                  <Route path="/orders" element={<OrderPage />} />
                  <Route
                    path="/admin-panel"
                    element={
                      <RoleGuard>
                        <AdminPage />
                      </RoleGuard>
                    }
                  />
                </Route>
              </Routes>
            </Suspense>
            <Footer />
          </AuthProvider>
        </ValidationProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
