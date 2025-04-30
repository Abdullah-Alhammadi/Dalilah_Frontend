import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/dalilah.png';
import './styles.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

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
            </div>
        </nav>
    );
}
