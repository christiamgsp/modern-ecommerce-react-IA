import { Link } from 'lucide-react';

export const SkeletonCard = () => {
  return (
    <div className='bg-white p-4 rounded-3xl shadow-sm border border-gray-100 animate-pulse'>
      {/* El hueco de la imagen */}
      <div className='bg-gray-200 h-48 w-full rounded-2xl mb-4'></div>

      {/* El hueco del título (línea larga) */}
      <div className='h-4 bg-gray-200 rounded-full w-3/4 mb-3'></div>

      {/* El hueco de la descripción (línea corta) */}
      <div className='h-3 bg-gray-100 rounded-full w-1/2 mb-6'></div>

      {/* El hueco del precio y el botón */}
      <div className='flex justify-between items-center'>
        <div className='h-6 bg-gray-200 rounded-full w-16'></div>
        <div className='h-10 bg-gray-200 rounded-xl w-24'></div>
      </div>
    </div>
  );
};
