import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/dalilah.png';
import './styles.css';
import * as usersAPI from "../../utilities/users-api";

export default function Navbar({ user, setUser }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        usersAPI.logout();
        setUser(null);
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                    <img src={logo} alt="Dalilah Logo" className="navbar-logo-img" />
                </Link>
            </div>

            <button
                className="navbar-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
            >
                &#9776;
            </button>

            <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

                {user ? (
                    <>
                        <Link to="/explore" onClick={() => setMenuOpen(false)}>See Places</Link>
                        <Link to="/places/add" onClick={() => setMenuOpen(false)}>Add Place</Link>
                        <Link to="/recommendations" onClick={() => setMenuOpen(false)}>Your Recommendations</Link>
                        <button onClick={handleLogout} className="logout-btn">Log out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                        <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
