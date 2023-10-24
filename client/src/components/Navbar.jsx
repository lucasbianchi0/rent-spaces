import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="URL_DEL_LOGO" alt="Logo" className="h-8 w-8" />
        </div>
        <div className="hidden md:flex items-center justify-end flex-grow">
        <Link to={'/'} className="text-white mx-2">Espacios</Link>
          <Link to={'/login'} className="text-white mx-2">Ingresar</Link>
          <Link to={'/signup'} className="text-white mx-2">Crear espacio</Link>
          <Link to={'/account'} className="text-white mx-2">Cuenta</Link>
        </div>
        <div className="md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow">
            <button className="text-blue-500 font-bold mb-4" onClick={toggleMenu}>
              <i className="fas fa-times"></i>
            </button>
            <div className="flex flex-col">
              <Link to={'/'} className="text-blue-500 mb-2" onClick={toggleMenu}>Espacios</Link>
              <Link to={'/edit-space'} className="text-blue-500 mb-2" onClick={toggleMenu}>editar espacio</Link>
              <Link to={'/login'} className="text-blue-500 mb-2" onClick={toggleMenu}>Ingresar</Link>
              <Link to={'/signup'} className="text-blue-500 mb-2" onClick={toggleMenu}>Crear espacio</Link>
              <Link to={'/account'} className="text-blue-500 mb-2" onClick={toggleMenu}>Cuenta</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
