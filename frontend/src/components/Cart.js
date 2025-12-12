import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user, isAdmin } = useAuth();
  const [purchaseMessage, setPurchaseMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const syncCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else if (item.id === productId && item.quantity === 1) {
          return null;
        }
        return item;
      })
      .filter(Boolean);

    syncCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setPurchaseMessage("");
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handlePurchase = () => {
    clearCart();
    setPurchaseMessage("¡Gracias por su compra!");
  };

  // Si es admin, no debería usar carrito
  if (user && isAdmin()) {
    return (
      <div className="container my-5">
        <h2 className="text-center mb-4">Carrito de Compras</h2>
        <div className="alert alert-warning" role="alert">
          El administrador no puede realizar compras.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Carrito de Compras</h2>

      {user ? (
        cart.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Precio Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, index) => (
                  <tr key={`${product.id}-${index}`}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>${product.price}</td>
                    <td>${product.price * product.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-outline-secondary" onClick={clearCart}>
                Vaciar carrito
              </button>

              <div className="text-end">
                <h4 className="mb-2">Total: ${getTotalPrice()}</h4>
                <button className="btn btn-success" onClick={handlePurchase}>
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">{purchaseMessage || "El carrito está vacío."}</p>
        )
      ) : (
        <p className="text-center">
          Tenés que iniciar sesión para agregar productos a tu carrito.
        </p>
      )}
    </div>
  );
};

export default Cart;
