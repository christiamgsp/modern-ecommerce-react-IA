import { ProductCard } from './components/ProductCard';
import { products } from './data/products';
import { useState } from 'react';

function App() {
  const [carrito, setCarrito] = useState([]);

  const Sumador = (productoParaAñadir) => {
    setCarrito([...carrito, productoParaAñadir]);
  };

  const total = carrito.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {products.map((e) => {
        return <ProductCard onAgregar={Sumador} key={e.id} product={e} />;
      })}
      <div className='flex flex-col gap-2 mt-4 w-80 mx-auto'>
        {carrito.map((e, index) => (
          <div
            key={index}
            className='bg-gray-800 text-white rounded-xl p-3 flex justify-between items-center shadow hover:scale-105 transition-transform duration-200'>
            <span className='font-semibold'>{e.name}</span>
          </div>
        ))}

        <div>
          <div className='bg-gray-800 text-white rounded-xl p-4 shadow-md w-64 mx-auto mt-4'>
            <h1 className='bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce [animation-duration:2s]'>
              Juegos Seleccionados 🛒 {carrito.length}
            </h1>

            <h3 className='text-lg font-bold text-green-400'>
              Total a pagar {total} €{' '}
            </h3>
          </div>
          <button
            className='bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded cursor-pointer w-fit'
            onClick={() => setCarrito([])}>
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
