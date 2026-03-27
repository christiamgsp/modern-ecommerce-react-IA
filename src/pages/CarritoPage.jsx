import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export const CarritoPage = () => {
  const { carrito, total, finalizarCompra, restador, RestadorUno, Sumador } =
    useContext(CartContext);

  return (
    <div className='p-10 max-w-4xl mx-auto w-full transition-colors duration-500'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-black text-gray-900 dark:text-white'>
          Tu Carrito
        </h1>
        <Link
          to='/'
          className='text-indigo-600 dark:text-indigo-400 font-bold hover:underline'>
          ← Volver a la tienda
        </Link>
      </div>

      {carrito.length === 0 ? (
        <div className='text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800'>
          <p className='text-gray-400 dark:text-slate-500'>
            Tu carrito está vacío
          </p>
          <Link
            to='/'
            className='mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-colors'>
            Ir a comprar
          </Link>
        </div>
      ) : (
        <div className='bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800'>
          <div className='p-8 space-y-4'>
            {carrito.map((e) => (
              <div
                key={e.id}
                className='flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-4 last:border-0'>
                <div className='flex flex-col'>
                  <span className='font-bold text-lg text-gray-800 dark:text-slate-200'>
                    {e.name}
                  </span>
                </div>

                <div className='flex items-center gap-6'>
                  <div className='flex items-center bg-gray-100 dark:bg-slate-800 rounded-xl p-1 shadow-inner border border-gray-200 dark:border-slate-700'>
                    <button
                      className='w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-gray-600 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition-all active:scale-90 font-bold cursor-pointer'
                      onClick={() => RestadorUno(e.id)}>
                      -
                    </button>

                    <span className='px-3 font-black text-gray-700 dark:text-slate-200 w-8 text-center'>
                      {e.cantidad}
                    </span>

                    <button
                      className='w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-gray-600 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-all active:scale-90 font-bold cursor-pointer'
                      onClick={() => Sumador(e)}>
                      +
                    </button>
                  </div>

                  <span className='font-black text-indigo-600 dark:text-indigo-400 text-xl min-w-[80px] text-right'>
                    {(e.price * e.cantidad).toFixed(2)}€
                  </span>

                  <button
                    onClick={() => restador(e.id)}
                    className='text-red-400 hover:text-red-600 transition-colors p-2 cursor-pointer opacity-80 hover:opacity-100'
                    title='Eliminar producto'>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-gray-50 dark:bg-slate-800/50 p-8 flex justify-between items-center border-t border-gray-100 dark:border-slate-800'>
            <div>
              <p className='text-gray-400 dark:text-slate-500 uppercase text-xs font-bold tracking-widest'>
                Total a pagar
              </p>
              <p className='text-4xl font-black text-gray-900 dark:text-white'>
                {total.toFixed(2)}€
              </p>
            </div>
            <button
              onClick={() => {
                finalizarCompra();
                toast.success('¡Compra realizada con éxito!');
              }}
              className='bg-gray-900 dark:bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all cursor-pointer shadow-lg'>
              FINALIZAR COMPRA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
