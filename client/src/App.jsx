
import './App.css';


import Home from './components/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Equipment from './components/equipment/Equipment';
import Login from './components/login/Login';
import Register from './components/register/Register';

import OrderPage from './components/order/OrderPage';
import AdminPage from './components/adminPage/AdminPage';




function App() {
  return (
    <>
    <Header />
    <Home />
    <About />
    <Contact />
    <Equipment />
    <Login />
    <Register />
    <OrderPage />
    <AdminPage />
    <Footer />
    </>
  );
}

export default App;

/*  TODO:
- Components
4. Machines
5. Login
6. Register

- Add logo




- Make sure its responsive
*/