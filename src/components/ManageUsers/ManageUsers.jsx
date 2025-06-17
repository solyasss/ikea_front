import React, { useEffect, useState } from "react";
import "./ManageUsers.css";

export default function ManageUsers() {
    const emptyUser = {
        firstName:"", lastName:"", email:"", phone:"",
        address:"", country:"", birthDate:"", password:"", isAdmin:false
    };

    const [users, setUsers]       = useState([]);
    const [newUser,setNewUser]    = useState({...emptyUser});
    const [editUser,setEditUser]  = useState(null);
    const [showCreate,setShow]    = useState(false);

    const [page,setPage]   = useState(1);
    const pageSize = 10;
    const [total,setTotal] = useState(0);
    const totalPages = Math.ceil(total / pageSize);

    const fetchUsers = async () => {
        const res = await fetch(
            `http://localhost:5123/api/users/paged?page=${page}&pageSize=${pageSize}`
        );
        const { items, totalCount } = await res.json();
        setUsers(items); setTotal(totalCount);
    };
    useEffect(()=>{ fetchUsers(); },[page]);

    const createUser = async () => {
        await fetch("http://localhost:5123/api/users",{
            method:"POST",headers:{ "Content-Type":"application/json" },
            body: JSON.stringify(newUser)
        });
        setNewUser({...emptyUser}); setShow(false); fetchUsers();
    };
    const updateUser = async () => {
        await fetch(`http://localhost:5123/api/users/${editUser.id}`,{
            method:"PUT",headers:{ "Content-Type":"application/json" },
            body: JSON.stringify(editUser)
        });
        setEditUser(null); fetchUsers();
    };
    const deleteUser = async id => {
        if(!window.confirm("Удалить пользователя?")) return;
        await fetch(`http://localhost:5123/api/users/${id}`,{method:"DELETE"});
        fetchUsers();
    };

    const PgBtn = ({p}) => (
        <button disabled={p===page} className={p===page?"pg-active":""}
                onClick={()=>setPage(p)}>{p}</button>
    );

    return (
        <div className="admin-container">
            <h1 className="admin-title">Управление пользователями</h1>
            <button onClick={()=>setShow(true)} className="btn-create start_btn-create">Создать</button>

            {showCreate && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Создать пользователя</h2>
                        <div className="form-group">
                            {Object.keys(emptyUser).filter(k=>k!=="isAdmin")
                                .map(k=>(
                                    <input key={k} placeholder={k}
                                           type={k==="password"?"password":k==="birthDate"?"date":"text"}
                                           value={newUser[k]} onChange={e=>setNewUser({...newUser,[k]:e.target.value})}/>
                                ))}
                            <label>
                                <input type="checkbox" checked={newUser.isAdmin}
                                       onChange={e=>setNewUser({...newUser,isAdmin:e.target.checked})}/>
                                Администратор
                            </label>
                            <button onClick={createUser} className="btn-create">Создать</button>
                            <button onClick={()=>setShow(false)} className="btn-cancel">Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            {editUser && (
                <div className="model">
                    <div className="admin-card">
                        <h2>Редактировать пользователя</h2>
                        <div className="form-group">
                            {Object.keys(emptyUser).filter(k=>k!=="password").map(k=>(
                                <input key={k} placeholder={k}
                                       type={k==="birthDate"?"date":"text"}
                                       value={editUser[k]}
                                       onChange={e=>setEditUser({...editUser,[k]:e.target.value})}/>
                            ))}
                            <label>
                                <input type="checkbox" checked={editUser.isAdmin}
                                       onChange={e=>setEditUser({...editUser,isAdmin:e.target.checked})}/>
                                Администратор
                            </label>
                            <button onClick={updateUser} className="btn-create">Обновить</button>
                            <button onClick={()=>setEditUser(null)} className="btn-cancel">Отмена</button>
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
                    {users.map(u=>(
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.firstName} {u.lastName}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{u.country}</td>
                            <td>{u.isAdmin?"Да":"Нет"}</td>
                            <td>
                                <button onClick={()=>setEditUser(u)} className="btn-edit">Редактировать</button>
                                <button onClick={()=>deleteUser(u.id)} className="btn-delete">Удалить</button>
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
