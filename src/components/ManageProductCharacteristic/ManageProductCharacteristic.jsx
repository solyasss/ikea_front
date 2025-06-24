import React, { useEffect, useState } from "react";
import "./ManageProductCharacteristic.css"; 

export default function ManageCharacteristics() {
    const [characteristics, setCharacteristics] = useState([]);
    const [newChar, setNewChar] = useState({ productId: 0, name: "", value: "" });
    const [editChar, setEditChar] = useState(null);
    const [showCreate, setShow] = useState(false);

    const fetchCharacteristics = async () => {
        const res = await fetch("https://localhost:7290/api/ProductCharacteristic");
        const data = await res.json();
        setCharacteristics(data);
    };

    useEffect(() => { fetchCharacteristics(); }, []);

    const createChar = async () => {
        await fetch("https://localhost:7290/api/ProductCharacteristic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newChar)
        });
        setNewChar({ productId: 0, name: "", value: "" });
        setShow(false);
        fetchCharacteristics();
    };

    const updateChar = async () => {
        await fetch(`https://localhost:7290/api/ProductCharacteristic/${editChar.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editChar)
        });
        setEditChar(null);
        fetchCharacteristics();
    };

    const deleteChar = async id => {
        if (!window.confirm("Удалить характеристику?")) return;
        await fetch(`https://localhost:7290/api/ProductCharacteristic/${id}`, {
            method: "DELETE"
        });
        fetchCharacteristics();
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Управление характеристиками продукта</h1>
            <button onClick={() => setShow(true)} className="btn-create start_btn-create">Создать</button>

            {showCreate && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Создать характеристику</h2>
                        <div className="form-group">
                            <input placeholder="Product ID" type="number" value={newChar.productId}
                                onChange={e => setNewChar({ ...newChar, productId: +e.target.value })} />
                            <input placeholder="Название" value={newChar.name}
                                onChange={e => setNewChar({ ...newChar, name: e.target.value })} />
                            <input placeholder="Значение" value={newChar.value}
                                onChange={e => setNewChar({ ...newChar, value: e.target.value })} />
                            <button onClick={createChar} className="btn-create">Создать</button>
                            <button onClick={() => setShow(false)} className="btn-cancel">Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            {editChar && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Редактировать характеристику</h2>
                        <div className="form-group">
                            <input type="number" placeholder="Product ID" value={editChar.productId}
                                onChange={e => setEditChar({ ...editChar, productId: +e.target.value })} />
                            <input placeholder="Название" value={editChar.name}
                                onChange={e => setEditChar({ ...editChar, name: e.target.value })} />
                            <input placeholder="Значение" value={editChar.value}
                                onChange={e => setEditChar({ ...editChar, value: e.target.value })} />
                            <button onClick={updateChar} className="btn-create">Обновить</button>
                            <button onClick={() => setEditChar(null)} className="btn-cancel">Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-card">
                <h2>Список характеристик</h2>
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Product ID</th><th>Название</th><th>Значение</th><th>Действия</th></tr>
                    </thead>
                    <tbody>
                        {characteristics.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.productId}</td>
                                <td>{c.name}</td>
                                <td>{c.value}</td>
                                <td>
                                    <button onClick={() => setEditChar(c)} className="btn-edit">Редактировать</button>
                                    <button onClick={() => deleteChar(c.id)} className="btn-delete">Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
