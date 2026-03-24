import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const RestadorUno = (id) => {
    setCarrito((prev) => {
      const itemExistente = prev.find((p) => p.id === id);
      if (itemExistente.cantidad > 1) {
        return prev.map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        );
      } else {
        return prev.filter((p) => p.id !== id);
      }
    });
  };

  const Sumador = (item) => {
    setCarrito((prev) => {
      const existe = prev.find((prod) => prod.id === item.id);
      if (existe) {
        return prev.map((prod) =>
          prod.id === item.id
            ? { ...prod, cantidad: (prod.cantidad || 1) + 1 }
            : prod
        );
      }
      return [...prev, { ...item, cantidad: 1 }];
    });
  };

  const restador = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const finalizarCompra = () => setCarrito([]);

  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        Sumador,
        restador,
        finalizarCompra,
        total,
        RestadorUno,
      }}>
      {children}
    </CartContext.Provider>
  );
};
