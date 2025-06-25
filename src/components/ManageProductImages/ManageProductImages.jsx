import React, { useEffect, useState } from "react";

export default function ManageProductImages() {
    const [images, setImages] = useState([]);
    const [newImg, setNewImg] = useState({ productId: 0, imageUrl: "", sortOrder: 0 });
    const [editImg, setEditImg] = useState(null);
    const [showCreate, setShowCreate] = useState(false);

    const fetchImages = async () => {
        const res = await fetch("https://localhost:7290/api/productsImage");
        const data = await res.json();
        setImages(data);
    };

    useEffect(() => { fetchImages(); }, []);

    const createImage = async () => {
        await fetch("https://localhost:7290/api/productsImage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newImg),
        });
        setNewImg({ productId: 0, imageUrl: "", sortOrder: 0 });
        setShowCreate(false);
        fetchImages();
    };

    const updateImage = async () => {
        await fetch(`https://localhost:7290/api/productsImage/${editImg.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editImg),
        });
        setEditImg(null);
        fetchImages();
    };

    const deleteImage = async (id) => {
        if (!window.confirm("Видалити зображення?")) return;
        await fetch(`https://localhost:7290/api/productsImage/${id}`, {
            method: "DELETE",
        });
        fetchImages();
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Управління зображеннями товарів</h1>
            <button onClick={() => setShowCreate(true)} className="btn-create start_btn-create">Додати зображення</button>

            {showCreate && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Нове зображення</h2>
                        <div className="form-group">
                            <input type="number" placeholder="ID товару" value={newImg.productId}
                                   onChange={e => setNewImg({ ...newImg, productId: +e.target.value })} />
                            <input placeholder="URL зображення" value={newImg.imageUrl}
                                   onChange={e => setNewImg({ ...newImg, imageUrl: e.target.value })} />
                            <input type="number" placeholder="Порядок сортування" value={newImg.sortOrder}
                                   onChange={e => setNewImg({ ...newImg, sortOrder: +e.target.value })} />
                            <button onClick={createImage} className="btn-create">Створити</button>
                            <button onClick={() => setShowCreate(false)} className="btn-cancel">Скасувати</button>
                        </div>
                    </div>
                </div>
            )}

            {editImg && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Редагувати зображення</h2>
                        <div className="form-group">
                            <input type="number" placeholder="ID товару" value={editImg.productId}
                                   onChange={e => setEditImg({ ...editImg, productId: +e.target.value })} />
                            <input placeholder="URL зображення" value={editImg.imageUrl}
                                   onChange={e => setEditImg({ ...editImg, imageUrl: e.target.value })} />
                            <input type="number" placeholder="Порядок сортування" value={editImg.sortOrder}
                                   onChange={e => setEditImg({ ...editImg, sortOrder: +e.target.value })} />
                            <button onClick={updateImage} className="btn-create">Оновити</button>
                            <button onClick={() => setEditImg(null)} className="btn-cancel">Скасувати</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-card">
                <h2>Список зображень</h2>
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID товару</th>
                        <th>URL</th>
                        <th>Порядок</th>
                        <th>Дії</th>
                    </tr>
                    </thead>
                    <tbody>
                    {images.map(img => (
                        <tr key={img.id}>
                            <td>{img.id}</td>
                            <td>{img.productId}</td>
                            <td>{img.imageUrl}</td>
                            <td>{img.sortOrder}</td>
                            <td>
                                <button onClick={() => setEditImg(img)} className="btn-edit">Редагувати</button>
                                <button onClick={() => deleteImage(img.id)} className="btn-delete">Видалити</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
