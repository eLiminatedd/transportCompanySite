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
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="cont">
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/admin-panel" element={<AdminPage />} />
          </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
