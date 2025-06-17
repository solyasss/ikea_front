import React, { useEffect, useState } from "react";
import "./ManageProducts.css";

export default function ManageProducts() {
    const emptyProduct = {
        article: "", categoryId: 0, name: "", price: 0, mainImage: "",
        description: "", color: "", dimensions: "", weight: 0,
        type: "", countryOfOrigin: "", packageContents: "",
        warranty: "", materials: "", rating: 0
    };

    const [products, setProducts]   = useState([]);
    const [newProduct, setNewProduct]   = useState({ ...emptyProduct });
    const [editProduct, setEditProduct] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [page, setPage] = useState(1);
    const pageSize = 10;          // при желании меняйте
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / pageSize);

    const fetchProducts = async () => {
        try {
            const res = await fetch(
                `http://localhost:5123/api/products/paged?page=${page}&pageSize=${pageSize}`
            );
            const { items, totalCount } = await res.json();
            setProducts(items);
            setTotal(totalCount);
        } catch (e) { console.error("Ошибка загрузки:", e); }
    };
    useEffect(() => { fetchProducts(); }, [page]);

    const validate = (p) =>
        p.article && p.name && p.price > 0 && p.categoryId > 0;

    const createProduct = async () => {
        if (!validate(newProduct)) return alert("Заполните обязательные поля");
        await fetch("http://localhost:5123/api/products", {
            method:"POST", headers:{ "Content-Type":"application/json" },
            body: JSON.stringify(newProduct)
        });
        setNewProduct({ ...emptyProduct });
        setShowCreateModal(false);
        fetchProducts();
    };

    const updateProduct = async () => {
        if (!validate(editProduct)) return alert("Заполните обязательные поля");
        await fetch(`http://localhost:5123/api/products/${editProduct.id}`, {
            method:"PUT", headers:{ "Content-Type":"application/json" },
            body: JSON.stringify(editProduct)
        });
        setEditProduct(null);
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Удалить продукт?")) return;
        await fetch(`http://localhost:5123/api/products/${id}`, { method:"DELETE" });
        fetchProducts();
    };

    const handleEditClick = async (id) => {
        const res  = await fetch(`http://localhost:5123/api/products/${id}`);
        const full = await res.json();
        setEditProduct({
            ...emptyProduct,
            ...full,
            categoryId: full.category?.id ?? 0
        });
    };

    const renderInputs = (obj, set) =>
        Object.keys(emptyProduct).map(k => (
            <input key={k}
                   type={["price","weight","rating","categoryId"].includes(k) ? "number":"text"}
                   name={k} placeholder={k}
                   value={obj[k] ?? ""} onChange={e => set(o => ({...o,[k]:e.target.value}))}
            />
        ));

    const PgBtn = ({p}) => (
        <button
            disabled={p===page} className={p===page?"pg-active":""}
            onClick={()=>setPage(p)}
        >{p}</button>
    );

    return (
        <div className="admin-container">
            <h1 className="admin-title">Управление продуктами</h1>
            <button onClick={()=>setShowCreateModal(true)} className="btn-create start_btn-create">Создать</button>

            {showCreateModal && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Создать продукт</h2>
                        <div className="form-group">
                            {renderInputs(newProduct, setNewProduct)}
                            <button onClick={createProduct} className="btn-create">Создать</button>
                            <button onClick={()=>setShowCreateModal(false)} className="btn-cancel">Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            {editProduct && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Редактировать продукт</h2>
                        <div className="form-group">
                            {renderInputs(editProduct, setEditProduct)}
                            <button onClick={updateProduct} className="btn-create">Сохранить</button>
                            <button onClick={()=>setEditProduct(null)} className="btn-cancel">Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-card">
                <h2>Список продуктов</h2>
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>ID</th><th>Название</th><th>Артикул</th>
                        <th>Цена</th><th>Изображение</th><th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p=>(
                        <tr key={p.id}>
                            <td>{p.id}</td><td>{p.name}</td><td>{p.article}</td>
                            <td>{p.price} грн</td>
                            <td>{p.mainImage?.slice(0,20)}…</td>
                            <td>
                                <button onClick={()=>handleEditClick(p.id)} className="btn-edit">Редактировать</button>
                                <button onClick={()=>deleteProduct(p.id)} className="btn-delete">Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {totalPages>1 && (
                    <div className="paginator">
                        <button disabled={page===1} onClick={()=>setPage(page-1)}>‹</button>
                        {Array.from({length:totalPages},(_,i)=>i+1)
                            .filter(p=>p===1||p===totalPages||Math.abs(p-page)<=1)
                            .map(p=><PgBtn key={p} p={p}/>)}
                        <button disabled={page===totalPages} onClick={()=>setPage(page+1)}>›</button>
                    </div>
                )}
            </div>
        </div>
    );
}
