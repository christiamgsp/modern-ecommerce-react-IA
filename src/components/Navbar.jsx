import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = ({ busqueda, onSearch }) => {
  const { carrito } = useContext(CartContext);
  return (
    <nav className='w-full p-4 bg-white border-b border-gray-100 sticky top-0 z-50 flex justify-between items-center px-8'>
      <div className='text-2xl font-black tracking-tighter text-indigo-600'>
        SMART<span className='text-gray-900'>SHOP</span>
      </div>

      <div className='w-full max-w-md'>
        <input
          type='text'
          placeholder='Buscar productos...'
          className='w-full bg-gray-100 text-gray-800 px-5 py-2.5 rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none transition-all duration-300'
          value={busqueda}
          onChange={onSearch}
        />
      </div>

      <div className='w-24 flex justify-end'>
        <Link
          to='/carrito'
          className='relative p-2 text-2xl text-gray-600 hover:text-indigo-600 transition-colors'>
          🛒
          <span className='absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white'>
            {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
          </span>
        </Link>
      </div>
    </nav>
  );
};
export { Navbar };
