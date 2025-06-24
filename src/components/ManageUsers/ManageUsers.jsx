import React, { useEffect, useState } from "react";
import "./ManageUsers.css";

export default function ManageUsers() {
    const emptyUser = {
        firstName: "", lastName: "", email: "", phone: "",
        address: "", country: "", birthDate: "", password: "", isAdmin: false
    };

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ ...emptyUser });
    const [editUser, setEditUser] = useState(null);
    const [showCreate, setShow] = useState(false);

    const [page, setPage] = useState(1);
    const pageSize = 5;
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / pageSize);

    const fetchUsers = async () => {
        const res = await fetch(
            `https://localhost:7290/api/users/paged?page=${page}&pageSize=${pageSize}`
        );
        const { items, totalCount } = await res.json();
        setUsers(items); setTotal(totalCount);
    };
    useEffect(() => { fetchUsers(); }, [page]);

    const createUser = async () => {
        await fetch("https://localhost:7290/api/users", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });
        setNewUser({ ...emptyUser }); setShow(false); fetchUsers();
    };

    const loadUserToEdit = async (id) => {
        const res = await fetch(`https://localhost:7290/api/users/${id}`);
        const user = await res.json();

        // birthDate в формате "yyyy-MM-dd" для input[type=date]
        const birthDate = new Date(user.birthDate).toISOString().substring(0, 10);

        setEditUser({
            ...user,
            birthDate,
        });
    };

    const updateUser = async (user) => {
        const dto = {
            isAdmin: user.isAdmin,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            country: user.country,
            address: user.address,
            phone: user.phone,
            email: user.email
        };

        await fetch(`https://localhost:7290/api/users/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        setEditUser(null);
        fetchUsers();
    };



    const deleteUser = async id => {
        if (!window.confirm("Удалить пользователя?")) return;
        await fetch(`https://localhost:7290/api/users/${id}`, { method: "DELETE" });
        fetchUsers();
    };

    const PgBtn = ({ p }) => (
        <button disabled={p === page} className={p === page ? "pg-active" : ""}
            onClick={() => setPage(p)}>{p}</button>
    );

    return (
        <div className="admin-container">
            <h1 className="admin-title">Управление пользователями</h1>
            <button onClick={() => setShow(true)} className="btn-create start_btn-create">Создать</button>

            {showCreate && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Создать пользователя</h2>
                        <div className="form-group">
                            {Object.keys(emptyUser).filter(k => k !== "isAdmin")
                                .map(k => (
                                    <input key={k} placeholder={k}
                                        type={k === "password" ? "password" : k === "birthDate" ? "date" : "text"}
                                        value={newUser[k]} onChange={e => setNewUser({ ...newUser, [k]: e.target.value })} />
                                ))}
                            <label>
                                <input type="checkbox" checked={newUser.isAdmin}
                                    onChange={e => setNewUser({ ...newUser, isAdmin: e.target.checked })} />
                                Администратор
                            </label>
                            <button onClick={createUser} className="btn-create">Создать</button>
                            <button onClick={() => setShow(false)} className="btn-cancel">Отмена</button>
                        </div>
                    </div>
                </div>
            )}
            {editUser && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Редактировать пользователя</h2>
                        <div className="form-group">
                            {["firstName", "lastName", "email", "phone", "address", "country", "birthDate"].map(k => (
                                <input key={k}
                                    placeholder={k}
                                    type={k === "birthDate" ? "date" : "text"}
                                    value={editUser[k] || ""}
                                    onChange={e => setEditUser({ ...editUser, [k]: e.target.value })}
                                />
                            ))}
                            <label>
                                <input type="checkbox"
                                    checked={editUser.isAdmin}
                                    onChange={e => setEditUser({ ...editUser, isAdmin: e.target.checked })}
                                />
                                Администратор
                            </label>
                            <button className="btn-create" onClick={() => updateUser(editUser)}>Сохранить</button>
                            <button className="btn-cancel" onClick={() => setEditUser(null)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="admin-card">
                <h2>Список пользователей</h2>
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Имя</th><th>Email</th>
                            <th>Телефон</th><th>Страна</th><th>Админ</th><th>Действия</th></tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.firstName} {u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.country}</td>
                                <td>{u.isAdmin ? "Да" : "Нет"}</td>
                                <td>
                                    <button onClick={() => loadUserToEdit(u.id)} className="btn-edit">Редактировать</button>
                                    <button onClick={() => deleteUser(u.id)} className="btn-delete">Удалить</button>
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