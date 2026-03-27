import { useState } from 'react';
import { preguntarIA } from '../lib/ia';

export const IAAssistant = ({ producto }) => {
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);

  const consultar = async () => {
    setCargando(true);
    try {
      const texto = await preguntarIA(producto);
      setRespuesta(texto);
    } catch (error) {
      setRespuesta('La IA se ha tomado un café, vuelve en un momento.');
    }
    setCargando(false);
  };

  return (
    <div className='mt-8 p-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-3xl border border-indigo-100 dark:border-indigo-500/20 transition-all duration-500'>
      <h3 className='text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter mb-2 flex items-center gap-2'>
        Sugerencia de la IA <span className='animate-pulse'>✨</span>
      </h3>

      {respuesta ? (
        <p className='text-gray-800 dark:text-slate-200 italic font-medium leading-relaxed'>
          "{respuesta}"
        </p>
      ) : (
        <button
          onClick={consultar}
          disabled={cargando}
          className='text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors disabled:opacity-50 cursor-pointer'>
          {cargando ? (
            <span className='flex items-center gap-2'>
              <span className='animate-bounce'>●</span> Pensando...
            </span>
          ) : (
            '¿Por qué comprarlo?'
          )}
        </button>
      )}
    </div>
  );
};
