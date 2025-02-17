import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/mylogo.jpg';
import cart_icon from '../Assets/cart_icon.png';
import cart_icon_dark from '../Assets/cart_icon_dark.png';
import moonIcon from '../Assets/dark_mode.png';
import sunIcon from '../Assets/light_mode.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const [icon, setIcon] = useState(cart_icon);
    const [menu, setMenu] = useState("Home");
    const { getTotalCartItems, theme, setTheme } = useContext(ShopContext);

    const toggle = () => {
        if (theme === "dark") {
            setTheme("light");
            setIcon(cart_icon_dark);
            const dnav = document.getElementById("nav");
            dnav.classList.add("dark");
        } else {
            setTheme("dark");
            setIcon(cart_icon);
            const dnav = document.getElementById("nav");
            dnav.classList.remove("dark");
        }
    };

    return (
        <div className={`navbar`} id="nav">
            <div className="nav-logo">
                <Link className="nav-logo-link" to="/">
                    <img src={logo} alt="Tile-Gen" style={{ marginRight: '10px' }} />
                    <p className={`pnav_${theme}`}>Tile-Gen</p>
                </Link>
            </div>
            <ul className="nav-menu">
                <li className={menu === "Home" ? "active" : ""} onClick={() => { setMenu("Home") }}>
                    <Link to='/'>Home</Link>
                    {menu === "Home" ? <hr /> : <></>}
                </li>
                <li className={menu === "men" ? "active" : ""} onClick={() => { setMenu("men") }}>
                    <Link to='/men'>Ceramic</Link>
                    {menu === "men" ? <hr /> : <></>}
                </li>
                <li className={menu === "women" ? "active" : ""} onClick={() => { setMenu("women") }}>
                    <Link to='/3DTiles'>3D Tiles</Link>
                </li>
                <li className={menu === "kids" ? "active" : ""} onClick={() => { setMenu("kids") }}>
                    <Link to='/tilecalculator'>Tile Calculator</Link>
                
                </li>
                <li className={menu === "kids" ? "active" : ""} onClick={() => { setMenu("kids") }}>
                    <Link to='/ImageGeneration'>Generate Tile</Link>
                
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button className='log_btn'>Login</button></Link>
                <Link to='/cart'><img src={icon} alt="" className='cart' /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                <div className='dark_btn'>
                    <button onClick={toggle} className={`toggle_${theme} change`}>
                        {theme === 'light' ? <img src={sunIcon}  /> : <img src={moonIcon}  />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
