import { toast } from 'sonner';
import { Link } from 'react-router-dom'; // Corregido: react-router-dom

export const ProductCard = ({ product, onAgregar }) => {
  const precioFormateado = product.price.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <div className='bg-white rounded-xl shadow-md flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
      <Link to={`/producto/${product.id}`} className='group cursor-pointer'>
        <div className='h-52 w-full bg-gray-50 flex items-center justify-center p-4'>
          <img
            src={product.image}
            alt={product.name}
            className='max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500'
          />
        </div>

        <div className='p-5 flex flex-col gap-2'>
          <span className='text-xs font-bold text-indigo-600 uppercase tracking-widest'>
            {product.category}
          </span>
          <h3 className='text-md font-semibold text-gray-800 line-clamp-2 h-12'>
            {product.name}
          </h3>
        </div>
      </Link>

      <div className='p-5 mt-auto pt-0 flex items-center justify-between'>
        <span className='text-xl font-black text-gray-900'>
          {precioFormateado}
        </span>
        <button
          onClick={() => {
            onAgregar(product);
            toast.success(`${product.name} añadido al carrito`);
          }}
          className='bg-gray-900 hover:bg-indigo-600 text-white p-3 rounded-full cursor-pointer transition-colors shadow-md active:scale-90'>
          🛒
        </button>
      </div>
    </div>
  );
};
