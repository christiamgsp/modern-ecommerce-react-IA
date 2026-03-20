import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export const CarritoPage = () => {
  const { carrito, total, finalizarCompra, restador } = useCart();

  return (
    <div className='p-10 max-w-4xl mx-auto w-full'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-black'>Tu Carrito</h1>
        <Link to='/' className='text-indigo-600 font-bold hover:underline'>
          ← Volver a la tienda
        </Link>
      </div>

      {carrito.length === 0 ? (
        <div className='text-center py-20 bg-white rounded-3xl border border-dashed'>
          <p className='text-gray-400'>Tu carrito está vacío</p>
          <Link
            to='/'
            className='mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-xl'>
            Ir a comprar
          </Link>
        </div>
      ) : (
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
          <div className='p-8 space-y-4'>
            {carrito.map((e) => (
              <div
                key={e.id}
                className='flex justify-between items-center border-b pb-4 last:border-0'>
                <div className='flex flex-col'>
                  <span className='font-bold text-lg'>{e.name}</span>
                  <span className='text-gray-500'>Cantidad: {e.cantidad}</span>
                </div>
                <div className='flex items-center gap-6'>
                  <span className='font-black text-indigo-600'>{e.price}€</span>
                  <button
                    onClick={() => restador(e.id)}
                    className='text-red-500 hover:text-red-700 font-bold text-sm'>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-gray-50 p-8 flex justify-between items-center'>
            <div>
              <p className='text-gray-400 uppercase text-xs font-bold tracking-widest'>
                Total a pagar
              </p>
              <p className='text-4xl font-black text-gray-900'>
                {total.toFixed(2)}€
              </p>
            </div>
            <button
              onClick={() => {
                finalizarCompra();
                toast.success('¡Compra realizada con éxito!');
              }}
              className='bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all'>
              FINALIZAR COMPRA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
