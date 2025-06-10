import React, { useEffect, useState } from "react";
import "./ManageProducts.css";

function ManageProducts() {
    const emptyProduct = {
        article: "",
        categoryId: 0,
        name: "",
        price: 0,
        mainImage: "",
        description: "",
        color: "",
        dimensions: "",
        weight: 0,
        type: "",
        countryOfOrigin: "",
        packageContents: "",
        warranty: "",
        materials: "",
        rating: 0
    };

    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ ...emptyProduct });
    const [editProduct, setEditProduct] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await fetch("https://localhost:7290/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Ошибка при загрузке продуктов:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (stateSetter) => (e) => {
        const { name, value } = e.target;
        stateSetter(prev => ({ ...prev, [name]: value }));
    };

    const validateProduct = (product) => {
        if (!product.article || !product.name || product.price <= 0 || product.categoryId <= 0) {
            alert("Заполните обязательные поля: Артикул, Название, Цена, Категория");
            return false;
        }
        return true;
    };

    const createProduct = async () => {
        if (!validateProduct(newProduct)) return;

        try {
            const res = await fetch("https://localhost:7290/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Ошибка создания продукта:", errorText);
                alert("Не удалось создать продукт.");
                return;
            }

            setNewProduct({ ...emptyProduct });
            setShowCreateModal(false);
            fetchProducts();
        } catch (error) {
            console.error("Ошибка создания:", error);
        }
    };

    const updateProduct = async () => {
        if (!editProduct || !validateProduct(editProduct)) return;

        try {
            const res = await fetch(`https://localhost:7290/api/products/${editProduct.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editProduct)
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Ошибка обновления продукта:", errorText);
                alert("Не удалось обновить продукт.");
                return;
            }

            setEditProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Ошибка обновления:", error);
        }
    };

    const handleEditClick = async (id) => {
        try {
            const res = await fetch(`https://localhost:7290/api/products/${id}`);
            if (!res.ok) {
                alert("Не удалось загрузить данные продукта.");
                return;
            }

            const fullProduct = await res.json();
            const normalized = {
                ...emptyProduct,
                ...fullProduct,
                categoryId: fullProduct.category?.id ?? 0,
            };

            setEditProduct(normalized);
        } catch (error) {
            console.error("Ошибка загрузки продукта:", error);
            alert("Ошибка при получении данных продукта.");
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Удалить продукт?")) return;

        try {
            await fetch(`https://localhost:7290/api/products/${id}`, { method: "DELETE" });
            fetchProducts();
        } catch (error) {
            console.error("Ошибка удаления:", error);
        }
    };

    const renderFormInputs = (product, setter) =>
        Object.keys(emptyProduct).map(key => (
            <input
                key={key}
                type={(["price", "weight", "rating", "categoryId"].includes(key)) ? "number" : "text"}
                name={key}
                placeholder={key}
                value={product[key] ?? ""}
                onChange={handleChange(setter)}
            />
        ));

    return (
        <div className="admin-container">
            <h1 className="admin-title">Управление продуктами</h1>
            <button onClick={() => setShowCreateModal(true)} className="btn-create start_btn-create">Создать</button>

            {showCreateModal && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Создать продукт</h2>
                        <div className="form-group">
                            {renderFormInputs(newProduct, setNewProduct)}
                            <button onClick={createProduct} className="btn-create">Создать</button>
                            <button onClick={() => setShowCreateModal(false)} className="btn-cancel">Отменить</button>
                        </div>
                    </div>
                </div>
            )}

            {editProduct && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Редактировать продукт</h2>
                        <div className="form-group">
                            {renderFormInputs(editProduct, setEditProduct)}
                            <button onClick={updateProduct} className="btn-create">Сохранить</button>
                            <button onClick={() => setEditProduct(null)} className="btn-cancel">Отменить</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-card">
                <h2>Список продуктов</h2>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Артикул</th>
                            <th>Цена</th>
                            <th>Изображение</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.article}</td>
                                <td>{p.price} грн</td>
                                <td>{p.mainImage?.slice(0, 20)}...</td>
                                <td>
                                    <button onClick={() => handleEditClick(p.id)} className="btn-edit">Редактировать</button>
                                    <button
                                        onClick={() => deleteProduct(p.id)}
                                        className="btn-delete"
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageProducts;
