import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = ({ busqueda, onSearch }) => {
  const { carrito } = useContext(CartContext);

  return (
    <nav className='w-full p-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 flex justify-between items-center px-8 transition-colors duration-500'>
      {/* Logo con variantes de color */}
      <div className='text-2xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400'>
        SMART<span className='text-gray-900 dark:text-slate-100'>SHOP</span>
      </div>

      {/* Input de búsqueda adaptativo */}
      <div className='w-full max-w-md px-4'>
        <input
          type='text'
          placeholder='Buscar productos...'
          className='w-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-100 px-5 py-2.5 rounded-xl border border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-700 focus:outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-slate-500'
          value={busqueda}
          onChange={onSearch}
        />
      </div>

      {/* Carrito con badge */}
      <div className='w-24 flex justify-end'>
        <Link
          to='/carrito'
          className='relative p-2 text-2xl text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'>
          🛒
          <span className='absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-slate-900'>
            {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export { Navbar };
