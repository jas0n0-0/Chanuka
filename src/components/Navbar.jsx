import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__top">
        <div className="navbar__date">{today}</div>
        <div className="navbar__brand">
          <Link to="/" className="navbar__wordmark">CHANUKA SAHII</Link>
          <span className="navbar__tagline">Verified. Trusted. Now.</span>
        </div>
        <div className="navbar__actions">
          <button
            className="navbar__icon-btn"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? "☀" : "☾"}
          </button>
          {user ? (
            <div className="navbar__user">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
                alt={user.displayName}
                className="navbar__avatar"
              />
              <button className="navbar__auth-btn" onClick={logout}>Sign Out</button>
            </div>
          ) : (
            <button className="navbar__auth-btn" onClick={handleLogin}>
              Sign In
            </button>
          )}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className="navbar__rule" />

      <nav className="navbar__nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
        <NavLink to="/trending" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Trending</NavLink>
        <NavLink to="/saved" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Saved</NavLink>
        {!user && (
          <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
        )}
      </nav>

      <div className="navbar__rule navbar__rule--thin" />
    </header>
  );
}
