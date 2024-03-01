/* eslint-disable react/prop-types */
import Logo from './Logo.jsx';

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

export default NavBar;
