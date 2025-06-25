import React, { useEffect, useState } from "react";
import "./ManageСategories.css";

export default function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [newCat, setNewCat] = useState({ title: "", slug: "", parentId: null });
    const [editCat, setEditCat] = useState(null);
    const [showCreate, setShow] = useState(false);

    const [page, setPage] = useState(1);
    const pageSize = 5;
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / pageSize);

    const fetchCategories = async () => {
        const res = await fetch(
            `https://localhost:7290/api/categories/paged?page=${page}&pageSize=${pageSize}`
        );
        const { items, totalCount } = await res.json();
        setCategories(items); setTotal(totalCount);
    };
    useEffect(() => { fetchCategories(); }, [page]);

    const createCat = async () => {
        await fetch("https://localhost:7290/api/categories", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCat)
        });
        setNewCat({ title: "", slug: "", parentId: null });
        setShow(false); fetchCategories();
    };

    const updateCat = async () => {
        await fetch(`https://localhost:7290/api/categories/${editCat.id}`, {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editCat)
        });
        setEditCat(null); fetchCategories();
    };

    const deleteCat = async id => {
        if (!window.confirm("Видалити категорію?")) return;
        await fetch(`https://localhost:7290/api/categories/${id}`, { method: "DELETE" });
        fetchCategories();
    };

    const PgBtn = ({ p }) => (
        <button disabled={p === page} className={p === page ? "pg-active" : ""}
                onClick={() => setPage(p)}>{p}</button>
    );

    return (
        <div className="admin-container">
            <h1 className="admin-title">Управління категоріями</h1>
            <button onClick={() => setShow(true)} className="btn-create start_btn-create">Створити</button>

            {showCreate && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Створити категорію</h2>
                        <div className="form-group">
                            <input placeholder="Назва" value={newCat.title}
                                   onChange={e => setNewCat({ ...newCat, title: e.target.value })} />
                            <input placeholder="Слаг (slug)" value={newCat.slug}
                                   onChange={e => setNewCat({ ...newCat, slug: e.target.value })} />
                            <button onClick={createCat} className="btn-create">Створити</button>
                            <button onClick={() => setShow(false)} className="btn-cancel">Скасувати</button>
                        </div>
                    </div>
                </div>
            )}

            {editCat && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Редагувати категорію</h2>
                        <div className="form-group">
                            <input placeholder="Назва" value={editCat.title}
                                   onChange={e => setEditCat({ ...editCat, title: e.target.value })} />
                            <input placeholder="Слаг (slug)" value={editCat.slug}
                                   onChange={e => setEditCat({ ...editCat, slug: e.target.value })} />
                            <button onClick={updateCat} className="btn-create">Оновити</button>
                            <button onClick={() => setEditCat(null)} className="btn-cancel">Скасувати</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-card">
                <h2>Список категорій</h2>
                <table className="admin-table">
                    <thead><tr><th>ID</th><th>Назва</th><th>Слаг</th><th>Дії</th></tr></thead>
                    <tbody>
                    {categories.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td><td>{c.title}</td><td>{c.slug}</td>
                            <td>
                                <button onClick={() => setEditCat(c)} className="btn-edit">Редагувати</button>
                                <button onClick={() => deleteCat(c.id)} className="btn-delete">Видалити</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className="paginator">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                            .map(p => <PgBtn key={p} p={p} />)}
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
                    </div>
                )}
            </div>
        </div>
    );
}
