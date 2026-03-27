import { Link } from 'react-router-dom';
import React from 'react';

export const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] text-center p-10 transition-colors duration-500'>
      {/* El 404 ahora es más sutil en modo oscuro para que no deslumbre */}
      <h1 className='text-9xl font-black text-indigo-100 dark:text-indigo-950/50 selection:bg-indigo-500'>
        404
      </h1>

      <p className='text-2xl font-bold text-gray-800 dark:text-slate-100 mt-4'>
        ¡Ups! Te has perdido en la tienda
      </p>

      <p className='text-gray-500 dark:text-slate-400 mt-2 mb-8'>
        La página que buscas no existe o ha sido movida.
      </p>

      <Link
        to='/'
        className='bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-black dark:hover:bg-slate-800 transition-all shadow-lg active:scale-95'>
        Volver a la Home
      </Link>
    </div>
  );
};
