import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/AuthContext';

const ProductList = () => {
  const { user } = useAuth(); 

 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
        } else {
          throw new Error("El contenido de localStorage no es un array válido");
        }
      } else {
        
        const initialProducts = [
          { id: 1, name: 'Pelota de fútbol', price: 500, description: 'Pelota de fútbol estándar para entrenamientos', imageUrl: 'https://via.placeholder.com/200' },
          { id: 2, name: 'Camiseta deportiva', price: 300, description: 'Camiseta para entrenamientos de alta calidad', imageUrl: 'https://via.placeholder.com/200' },
          { id: 3, name: 'Botines', price: 1200, description: 'Botines con excelente tracción para césped natural', imageUrl: 'https://via.placeholder.com/200' },
          { id: 4, name: 'Guantes de arquero', price: 800, description: 'Guantes de arquero con buen agarre y protección', imageUrl: 'https://via.placeholder.com/200' },
          { id: 5, name: 'Short deportivo', price: 200, description: 'Short cómodo para entrenamientos y partidos', imageUrl: 'https://via.placeholder.com/200' },
          { id: 6, name: 'Medias de compresión', price: 150, description: 'Medias que mejoran la circulación durante el ejercicio', imageUrl: 'https://via.placeholder.com/200' },
          { id: 7, name: 'Gorra deportiva', price: 100, description: 'Gorra ligera y transpirable para actividades al aire libre', imageUrl: 'https://via.placeholder.com/200' },
          { id: 8, name: 'Pesas ajustables', price: 2500, description: 'Pesas ajustables para entrenamientos de fuerza en casa', imageUrl: 'https://via.placeholder.com/200' },
          { id: 9, name: 'Mochila deportiva', price: 450, description: 'Mochila espaciosa para llevar tus artículos deportivos', imageUrl: 'https://via.placeholder.com/200' },
          { id: 10, name: 'Esterilla de yoga', price: 600, description: 'Esterilla antideslizante para yoga y ejercicios en el suelo', imageUrl: 'https://via.placeholder.com/200' },
          { id: 11, name: 'Cuerda para saltar', price: 120, description: 'Cuerda para saltar ligera y duradera para cardio', imageUrl: 'https://via.placeholder.com/200' },
          { id: 12, name: 'Balón de baloncesto', price: 700, description: 'Balón de baloncesto con excelente agarre y rebote', imageUrl: 'https://via.placeholder.com/200' },
        ];
        setProducts(initialProducts);
        localStorage.setItem('products', JSON.stringify(initialProducts));
      }
    } catch (error) {
      console.error("Error al cargar los productos desde localStorage:", error);
      setProducts([]); 
    }
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
