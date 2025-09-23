import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const { getTotalCartAmount, url } = useContext(StoreContext);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.post(`${url}/api/users/me`, {}, { withCredentials: true });
        setIsLoggedIn(res.data.success);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${url}/api/users/logout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='' className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>contact us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt='' /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.bag_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
