import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/AuthContext';
import { ProductsAPI } from "../api";


const ProductList = () => {
  const { user } = useAuth();


  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });


  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const apiProducts = await ProductsAPI.list();

        const normalized = (Array.isArray(apiProducts) ? apiProducts : []).map((p) => ({
          ...p,
          imageUrl: p.imageUrl || "https://via.placeholder.com/200",
          description: p.description ?? "",
          stock: p.stock ?? 0,
        }));

        if (mounted) setProducts(normalized);
      } catch (error) {
        console.error("Error al cargar los productos desde el backend:", error);
        if (mounted) setProducts([]);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);



  const addToCart = (product) => {
    if (user && user.role !== 'admin') {
      let updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(item => item.id === product.id);

      if (productIndex !== -1) {

        updatedCart[productIndex].quantity += 1;
      } else {

        updatedCart.push({ ...product, quantity: 1 });
      }


      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert(`${product.name} se ha añadido al carrito.`);
    } else if (!user) {
      alert('Por favor, inicie sesión para agregar productos al carrito.');
    } else {
      alert('El administrador no puede agregar productos al carrito.');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Productos Disponibles</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
              <div className="card h-100 w-100">
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text"><strong>Precio:</strong> ${product.price}</p>
                  <p className="card-text">{product.description}</p>
                  {/* el botón "agregar al carrito"  si  no es admin */}
                  {user && user.role !== 'admin' && (
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => addToCart(product)}
                    >
                      Agregar al Carrito
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay productos disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
