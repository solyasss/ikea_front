import React, { useEffect, useState } from "react";
import "./ManageUsers.css"

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        birthDate: "",
        password: "",
        isAdmin: false
    });
    const [editUser, setEditUser] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchUsers = async () => {
        const response = await fetch("https://localhost:7290/api/users");
        const data = await response.json();
        setUsers(data);
    };

    const showBlock = () => {
        setShowCreateModal(true);
    };

    const hideBlock = () => {
        setShowCreateModal(false);
        setNewUser({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            country: "",
            birthDate: "",
            password: "",
            isAdmin: false
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const createUser = async () => {
        await fetch("https://localhost:7290/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });
        hideBlock();
        fetchUsers();
    };

    const deleteUser = async (id) => {
        if (window.confirm("Вы уверены, что хотите удалить пользователя?")) {
            await fetch(`https://localhost:7290/api/users/${id}`, {
                method: "DELETE",
            });
            fetchUsers();
        }
    };

    const updateUser = async () => {
        if (editUser) {
            await fetch(`https://localhost:7290/api/users/${editUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editUser),
            });
            setEditUser(null);
            fetchUsers();
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Управление Пользователями</h1>
            <button onClick={showBlock} className="btn-create start_btn-create">Создать</button>

            {showCreateModal && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Создать пользователя</h2>
                        <div className="form-group">
                            <input placeholder="Имя" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                            <input placeholder="Фамилия" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                            <input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                            <input placeholder="Телефон" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                            <input placeholder="Адрес" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
                            <input placeholder="Страна" value={newUser.country} onChange={(e) => setNewUser({ ...newUser, country: e.target.value })} />
                            <input type="date" value={newUser.birthDate} onChange={(e) => setNewUser({ ...newUser, birthDate: e.target.value })} />
                            <input type="password" placeholder="Пароль" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                            <label>
                                <input type="checkbox" checked={newUser.isAdmin} onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })} />
                                Администратор
                            </label>
                            <button onClick={createUser} className="btn-create">Создать</button>
                            <button onClick={hideBlock} className="btn-cancel">Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            {editUser && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Редактировать пользователя</h2>
                        <div className="form-group">
                            <input placeholder="Имя" value={editUser.firstName} onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })} />
                            <input placeholder="Фамилия" value={editUser.lastName} onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })} />
                            <input placeholder="Email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                            <input placeholder="Телефон" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
                            <input placeholder="Адрес" value={editUser.address} onChange={(e) => setEditUser({ ...editUser, address: e.target.value })} />
                            <input placeholder="Страна" value={editUser.country} onChange={(e) => setEditUser({ ...editUser, country: e.target.value })} />
                            <input type="date" value={editUser.birthDate} onChange={(e) => setEditUser({ ...editUser, birthDate: e.target.value })} />
                            <label>
                                <input type="checkbox" checked={editUser.isAdmin} onChange={(e) => setEditUser({ ...editUser, isAdmin: e.target.checked })} />
                                Администратор
                            </label>
                            <button onClick={updateUser} className="btn-create">Обновить</button>
                            <button onClick={() => setEditUser(null)} className="btn-cancel">Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-card">
                <h2>Список пользователей</h2>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Телефон</th>
                            <th>Страна</th>
                            <th>Админ</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.firstName} {u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.country}</td>
                                <td>{u.isAdmin ? "Да" : "Нет"}</td>
                                <td>
                                    <button onClick={() => setEditUser(u)} className="btn-edit">Редактировать</button>
                                    <button onClick={() => deleteUser(u.id)} className="btn-delete">Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUsers;
