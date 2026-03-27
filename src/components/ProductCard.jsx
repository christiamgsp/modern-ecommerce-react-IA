import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product, onAgregar }) => {
  const precioFormateado = product.price.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <div className='bg-white dark:bg-slate-900 rounded-xl shadow-md dark:shadow-blue-900/10 flex flex-col border border-gray-100 dark:border-slate-800 hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all duration-300'>
      <Link to={`/producto/${product.id}`} className='group cursor-pointer'>
        <div className='h-52 w-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-4 rounded-t-xl'>
          <img
            src={product.image}
            alt={product.name}
            className='max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500'
          />
        </div>

        <div className='p-5 flex flex-col gap-2'>
          <span className='text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest'>
            {product.category}
          </span>
          <h3 className='text-md font-semibold text-gray-800 dark:text-slate-200 line-clamp-2 h-12'>
            {product.name}
          </h3>
        </div>
      </Link>

      <div className='p-5 mt-auto pt-0 flex items-center justify-between'>
        <span className='text-xl font-black text-gray-900 dark:text-white'>
          {precioFormateado}
        </span>
        <button
          onClick={() => {
            onAgregar(product);
            toast.success(`${product.name} añadido al carrito`);
          }}
          className='bg-gray-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white p-3 rounded-full cursor-pointer transition-colors shadow-md active:scale-90'>
          🛒
        </button>
      </div>
    </div>
  );
};
