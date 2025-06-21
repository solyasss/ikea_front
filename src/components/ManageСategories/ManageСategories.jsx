import React, { useEffect, useState } from "react";
import "./ManageСategories.css";

function ManageСategories() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ title: "", slug: "", parentId: null });
    const [editCategory, setEditCategory] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchCategories = async () => {
        const response = await fetch("https://localhost:7290/api/categories");
        const data = await response.json();
        setCategories(data);
    };

    const showBlock = () => {
        setShowCreateModal(true);
    };

    const hideBlock = () => {
        setShowCreateModal(false);
        setNewCategory({ title: "", slug: "", parentId: null });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const createCategory = async () => {
        await fetch("https://localhost:7290/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCategory),
        });
        setNewCategory({ title: "", slug: "", parentId: null });
        setShowCreateModal(false);
        fetchCategories();
    };

    const deleteCategory = async (id) => {
        if (window.confirm("Вы уверены, что хотите удалить категорию?")) {
            await fetch(`https://localhost:7290/api/categories/${id}`, {
                method: "DELETE",
            });
            fetchCategories();
        }
    };

    const updateCategory = async () => {
        if (editCategory) {
            await fetch(`https://localhost:7290/api/categories/${editCategory.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editCategory),
            });
            setEditCategory(null);
            fetchCategories();
        }
    };

    return (
        <>
            <div className="admin-container">
                <div>Hello</div> 
                <div>
                    <h1 className="admin-title">Управление Категориями</h1>
                    <button onClick={showBlock} className="btn-create start_btn-create">Создать</button>
                    {showCreateModal && (
                        <div className="model">
                            <div className="admin-card">
                                <h2>Создать новую категорию</h2>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Название"
                                        value={newCategory.title}
                                        onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Slug"
                                        value={newCategory.slug}
                                        onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                                    />
                                    <button onClick={createCategory} className="btn-create">Создать</button>
                                    <button onClick={hideBlock} className="btn-cancel">Отменить</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {editCategory && (
                        <div className="model">
                            <div className="admin-card">
                                <h2>Редактировать категорию</h2>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Название"
                                        value={editCategory.title}
                                        onChange={(e) => setEditCategory({ ...editCategory, title: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Slug"
                                        value={editCategory.slug}
                                        onChange={(e) => setEditCategory({ ...editCategory, slug: e.target.value })}
                                    />
                                    <button onClick={updateCategory} className="btn-create">Обновить</button>
                                    <button onClick={() => setEditCategory(null)} className="btn-cancel">Отменить</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="admin-card">
                        <h2>Список категорий</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Slug</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cat) => (
                                    <tr key={cat.id}>
                                        <td>{cat.id}</td>
                                        <td>{cat.title}</td>
                                        <td>{cat.slug}</td>
                                        <td>
                                            <button onClick={() => setEditCategory(cat)} className="btn-edit">
                                                Редактировать
                                            </button>
                                            <button onClick={() => deleteCategory(cat.id)} className="btn-delete">
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageСategories;