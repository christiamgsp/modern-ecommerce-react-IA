import { ProductCard } from './components/ProductCard';
import { useEffect, useState } from 'react';
import { useCart } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { Toaster, toast } from 'sonner';
import { SkeletonCard } from './components/SkeletonCard';
import { Routes, Route } from 'react-router-dom';
import { CarritoPage } from './pages/CarritoPage';

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
      <Toaster richColors position='top-center' />
      <Navbar busqueda={busqueda} onSearch={textSearcher} carrito={carrito} />

      <main className='flex flex-1 w-full relative'>
        {/* COLUMNA IZQUIERDA: PRODUCTOS Y MODAL */}
        <div className='flex-1 p-6'>
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
                        toast.success(`¡${seleccionado.name} añadido!`);
                      }}
                      className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 cursor-pointer'>
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Routes>
            {/* 1. Ruta de la tienda (HOME) */}
            <Route
              path='/'
              element={
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6'>
                  {productosApi.length === 0 ? (
                    [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
                  ) : searchedList.length > 0 ? (
                    searchedList.map((e) => (
                      <ProductCard
                        onDetalle={seleccionarProducto}
                        onAgregar={Sumador}
                        key={e.id}
                        product={e}
                      />
                    ))
                  ) : (
                    <div className='col-span-full py-20 text-center bg-white rounded-3xl shadow-sm border border-dashed border-gray-200'>
                      {/* ... Contenido de búsqueda vacía ... */}
                      <h3 className='text-xl font-bold text-gray-800'>
                        No hemos encontrado "{busqueda}"
                      </h3>
                      <button
                        onClick={() => setBusqueda('')}
                        className='mt-6 text-indigo-600 font-bold hover:underline cursor-pointer'>
                        Limpiar búsqueda
                      </button>
                    </div>
                  )}
                </div>
              }
            />

            {/* 2. Ruta del Carrito (Sustituye al grid cuando la URL es /carrito) */}
            <Route path='/carrito' element={<CarritoPage />} />

            {/* 3. Ruta de Detalle */}
            <Route
              path='/producto/:id'
              element={
                <h1 className='p-20 text-4xl text-center'>
                  Página de detalle en construcción 🛠️
                </h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
