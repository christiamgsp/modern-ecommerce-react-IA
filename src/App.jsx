import { ProductCard } from './components/ProductCard';
import { useEffect, useState } from 'react';
import { useCart } from './hooks/useCart';
import { Navbar } from './components/Navbar';

// 1. EL TRADUCTOR (Corregido para usar el título de la API)
const formaterProducto = (apiItem) => ({
  id: apiItem.id,
  name: apiItem.title,
  price: apiItem.price,
  category: apiItem.category,
  description: apiItem.description,
  image: apiItem.thumbnail,
});

function App() {
  const { carrito, Sumador, total, finalizarCompra, restador } = useCart();
  const [busqueda, setBusqueda] = useState('');
  const [productosApi, setProductosApi] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .then((data) => {
        const productosFiltrados = data.products.filter(
          (item) => item.category !== 'groceries'
        );
        const productosLimpios = productosFiltrados.map(formaterProducto);
        setProductosApi(productosLimpios);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  const textSearcher = (e) => setBusqueda(e.target.value);

  const seleccionarProducto = (item) => {
    setSeleccionado(item);
  };

  const searchedList = productosApi.filter((e) => {
    const nombreEnMinusculas = e.name?.toLowerCase() || '';
    const loQueBusco = busqueda.toLowerCase();
    return nombreEnMinusculas.includes(loQueBusco);
  });

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 text-gray-900'>
      <Navbar busqueda={busqueda} onSearch={textSearcher} />

      <main className='flex flex-1 w-full relative'>
        {/* COLUMNA IZQUIERDA: PRODUCTOS Y MODAL */}
        <div className='flex-1 p-6 lg:pr-[340px]'>
          {/* MODAL DE INFORMACIÓN */}
          {seleccionado && (
            <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all'>
              <div className='bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300'>
                {/* Botón X superior */}
                <button
                  className='absolute top-5 right-6 text-gray-400 hover:text-indigo-600 text-2xl font-bold cursor-pointer transition-colors'
                  onClick={() => setSeleccionado(null)}>
                  ✕
                </button>

                <span className='text-xs font-black text-indigo-600 uppercase tracking-widest mb-2 block'>
                  {seleccionado.category}
                </span>
                <h1 className='text-3xl font-black text-gray-900 mb-4 leading-tight'>
                  {seleccionado.name}
                </h1>
                <div className='h-1 w-12 bg-indigo-500 mb-6 rounded-full'></div>
                <p className='text-gray-600 leading-relaxed text-lg mb-8'>
                  {seleccionado.description}
                </p>

                <div className='flex items-center justify-between gap-4'>
                  <span className='text-2xl font-black text-gray-900'>
                    {seleccionado.price}€
                  </span>

                  <div className='flex gap-3'>
                    <button
                      onClick={() => setSeleccionado(null)}
                      className='bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 cursor-pointer'>
                      Cerrar
                    </button>

                    {/* BOTÓN AÑADIR */}
                    <button
                      onClick={() => {
                        Sumador(seleccionado);
                        setSeleccionado(null);
                      }}
                      className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 cursor-pointer'>
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GRID DE PRODUCTOS */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6'>
            {searchedList.map((e) => (
              <ProductCard
                onDetalle={seleccionarProducto}
                onAgregar={Sumador}
                key={e.id}
                product={e}
              />
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: CARRITO */}
        <aside className='hidden lg:flex fixed right-0 top-[88px] w-80 bg-white h-[calc(100vh-88px)] shadow-2xl border-l border-gray-100 flex-col'>
          <div className='p-6 flex-1 flex flex-col overflow-hidden'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold text-gray-800 italic'>
                Tu Selección
              </h2>
              <span className='bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full'>
                {carrito.length}
              </span>
            </div>

            <div className='flex-1 overflow-y-auto space-y-3 pr-2'>
              {carrito.length === 0 ? (
                <div className='text-center py-20 opacity-30 text-sm'>
                  Tu carrito está vacío
                </div>
              ) : (
                carrito.map((e) => (
                  <div
                    key={e.id}
                    className='flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100'>
                    <div className='flex flex-col max-w-[150px]'>
                      <span className='text-xs font-bold truncate text-gray-700'>
                        {e.name}
                      </span>
                      <span className='text-[10px] text-gray-400 font-semibold'>
                        Cant: {e.cantidad}
                      </span>
                    </div>
                    <div className='flex flex-col items-end'>
                      <span className='text-xs font-black text-indigo-600'>
                        {e.price}€
                      </span>
                      <button
                        onClick={() => restador(e.id)}
                        className='text-[10px] text-red-400 font-bold hover:text-red-600 transition-colors cursor-pointer'>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className='mt-6 pt-6 border-t border-gray-100'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-gray-400 font-bold text-sm uppercase'>
                  Total
                </span>
                <span className='text-2xl font-black text-gray-900'>
                  {total.toFixed(2)} €
                </span>
              </div>
              <button
                className='w-full bg-gray-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer'
                onClick={finalizarCompra}>
                FINALIZAR COMPRA
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
