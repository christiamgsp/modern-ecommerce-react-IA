import { useParams, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { IAAssistant } from '../components/IAAssistant';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const { Sumador } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Producto no encontrado');
        }
        return res.json();
      })
      .then((data) => setProducto(data))
      .catch((error) => {
        console.error(error);
        navigate('/ruta-que-no-existe');
      });
  }, [id, navigate]);

  if (!producto)
    return (
      <p className='p-20 text-center font-bold text-gray-800 dark:text-slate-200'>
        Cargando producto...
      </p>
    );

  const manejarSuma = () => {
    const item = {
      ...producto,
      name: producto.title,
      image: producto.thumbnail,
    };
    Sumador(item);
    toast.success(`${item.name} añadido correctamente`);
  };

  return (
    <div className='p-4 md:p-10 max-w-6xl mx-auto transition-colors duration-500'>
      <Link
        to='/'
        className='inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-6 md:mb-8 group text-sm md:text-base'>
        <span className='group-hover:-translate-x-1 transition-transform'>
          ←
        </span>
        Volver a la tienda
      </Link>

      <div className='flex flex-col lg:flex-row gap-8 md:gap-12 items-center lg:items-start'>
        <div className='w-full lg:flex-1 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex justify-center'>
          <img
            src={producto.thumbnail}
            alt={producto.title}
            className='w-64 md:w-80 h-auto object-contain rounded-2xl transition-transform duration-500'
          />
        </div>

        <div className='w-full lg:flex-1 text-center lg:text-left'>
          <span className='text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest text-xs md:text-sm'>
            {producto.category}
          </span>
          <h1 className='text-3xl md:text-5xl font-black text-gray-900 dark:text-white mt-2 leading-tight'>
            {producto.title}
          </h1>
          <p className='text-gray-500 dark:text-slate-400 mt-4 md:mt-6 text-base md:text-xl leading-relaxed'>
            {producto.description}
          </p>

          <IAAssistant producto={producto} />

          <div className='mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 md:gap-8'>
            <span className='text-3xl md:text-4xl font-black text-gray-900 dark:text-white'>
              {producto.price}€
            </span>

            <button
              onClick={manejarSuma}
              className='w-full sm:w-auto bg-indigo-600 dark:bg-indigo-500 text-white px-10 py-4 md:py-5 rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-95'>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
