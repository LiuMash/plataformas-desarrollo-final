import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ProductsAPI } from "../api";
import "./ProductManagement.css";

const ProductManagement = () => {
  const { user, token, isAdmin } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: 1,          // backend lo usa (si tu backend no lo requiere, no molesta)
    description: "",
    imageUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Guard: solo admin
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!isAdmin()) {
      navigate("/products");
      return;
    }
  }, [user, isAdmin, navigate]);

  // Cargar productos desde backend
  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const apiProducts = await ProductsAPI.list();
        const normalized = (Array.isArray(apiProducts) ? apiProducts : []).map((p) => ({
          ...p,
          imageUrl: p.imageUrl || "https://via.placeholder.com/200",
          description: p.description ?? "",
          stock: p.stock ?? 0,
        }));

        if (mounted) {
          setProducts(normalized);
        }
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // price/stock numéricos
    if (name === "price") {
      setNewProduct({ ...newProduct, price: value });
      return;
    }
    if (name === "stock") {
      setNewProduct({ ...newProduct, stock: value });
      return;
    }

    setNewProduct({ ...newProduct, [name]: value });
  };

  // Agregar o editar (backend)
  const handleAddOrEditProduct = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones mínimas
    if (!newProduct.name || !newProduct.price) {
      setError("Completá nombre y precio.");
      return;
    }
    if (!token) {
      setError("No hay token. Volvé a iniciar sesión como admin.");
      return;
    }

    try {
      const payload = {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock ?? 0),
        description: newProduct.description,
        imageUrl: newProduct.imageUrl,
      };

      if (isEditing && editProductId != null) {
        await ProductsAPI.update(editProductId, payload, token);

        // refresco local
        setProducts((prev) =>
          prev.map((p) => (p.id === editProductId ? { ...p, ...payload } : p))
        );

        setIsEditing(false);
        setEditProductId(null);
      } else {
        const created = await ProductsAPI.create(payload, token);

        // según cómo devuelva tu backend, puede devolver el producto creado con id.
        // si no devuelve id, recargamos lista.
        if (created && created.id != null) {
          setProducts((prev) => [{ ...created, imageUrl: created.imageUrl || payload.imageUrl || "https://via.placeholder.com/200" }, ...prev]);
        } else {
          const apiProducts = await ProductsAPI.list();
          setProducts(apiProducts);
        }
      }

      setNewProduct({ name: "", price: "", stock: 1, description: "", imageUrl: "" });
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((p) => p.id === productId);
    if (!productToEdit) return;

    setNewProduct({
      name: productToEdit.name ?? "",
      price: productToEdit.price ?? "",
      stock: productToEdit.stock ?? 0,
      description: productToEdit.description ?? "",
      imageUrl: productToEdit.imageUrl ?? "",
    });

    setIsEditing(true);
    setEditProductId(productId);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteProduct = async (productId) => {
    setError("");
    if (!token) {
      setError("No hay token. Volvé a iniciar sesión como admin.");
      return;
    }

    try {
      await ProductsAPI.remove(productId, token);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="product-management">
      <h2>Gestión de Productos</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div ref={formRef} className="product-form card p-3 my-3">
        <h3>{isEditing ? "Editar Producto" : "Agregar Nuevo Producto"}</h3>

        <form onSubmit={handleAddOrEditProduct}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre del Producto
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Precio
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="stock"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              min={0}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              URL de la Imagen
            </label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? "Guardar Cambios" : "Agregar Producto"}
          </button>
        </form>
      </div>

      <div className="product-list">
        <h3>Productos Actuales</h3>

        {loading ? (
          <p>Cargando...</p>
        ) : products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 w-100">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="card-img-top"
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      <strong>Precio:</strong> ${product.price}
                    </p>
                    <p className="card-text">
                      <strong>Stock:</strong> {product.stock ?? 0}
                    </p>
                    <p className="card-text">{product.description}</p>

                    <button
                      className="btn btn-warning btn-sm me-2 mt-auto"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;

