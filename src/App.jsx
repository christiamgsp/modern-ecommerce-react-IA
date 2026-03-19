import { ProductCard } from './components/ProductCard';
import { products } from './data/products';
import { useEffect, useState } from 'react';
import { useCart } from './hooks/useCart';
import { Navbar } from './components/Navbar';

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

        const productosLimpios = productosFiltrados.map((item) => {
          return {
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.thumbnail,
            category: item.category,
            description: item.description,
          };
        });

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

  // ... (Tus imports y lógica de estado se quedan igual)

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 text-gray-900'>
      <Navbar busqueda={busqueda} onSearch={textSearcher} />

      <main className='flex flex-1 w-full relative'>
        <div className='flex-1 p-6 lg:pr-[340px]'>
          {/* BLOQUE DEL MODAL: Ahora todo está envuelto por la condición */}
          {seleccionado && (
            <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all'>
              {/* Contenedor blanco con animaciones de entrada */}
              <div className='bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300'>
                {/* Botón de cerrar elegante */}
                <button
                  className='absolute top-5 right-6 text-gray-400 hover:text-indigo-600 text-2xl font-bold cursor-pointer transition-colors'
                  onClick={() => setSeleccionado(null)}>
                  ✕
                </button>

                {/* Contenido del producto */}
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

                {/* Precio destacado dentro del modal */}
                <div className='flex items-center justify-between'>
                  <span className='text-2xl font-black text-gray-900'>
                    {seleccionado.price}€
                  </span>
                  <button
                    onClick={() => {
                      Sumador(seleccionado);
                      setSeleccionado(null);
                    }}
                    className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95'>
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CUADRÍCULA DE PRODUCTOS (Sigue igual) */}
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

        {/* ASIDE DEL CARRITO (Sigue igual) */}
        <aside className='hidden lg:flex fixed right-0 top-[88px] w-80 bg-white h-[calc(100vh-88px)] shadow-2xl border-l border-gray-100 flex-col'>
          {/* ... (Todo tu código del carrito aquí) */}
        </aside>
      </main>
    </div>
  );
}
export default App;
