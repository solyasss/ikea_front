import React, { useState } from "react";
import "./CommentCard.css"

function CommentCard({ comment, currentUser, productId, onUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.commentText);
    const [editRating, setEditRating] = useState(comment.rating);

    const isOwner = currentUser?.id === comment.user.id;

    const handleDelete = async () => {
        if (window.confirm("Удалить комментарий?")) {
            const res = await fetch(`https://localhost:7290/api/productComments/${comment.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id: comment.id }),
            });

            if (res.ok) {
                onUpdated();
            } else {
                alert("Ошибка при удалении комментария.");
            }
        }
    };


    const handleUpdate = async () => {
        const dto = {
            id: comment.id,
            productId: parseInt(productId),
            userId: currentUser.id,
            commentText: editText,
            rating: editRating,
        };

        const res = await fetch(`https://localhost:7290/api/productComments/${comment.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(dto),
        });

        if (res.ok) {
            setIsEditing(false);
            onUpdated();
        } else {
            alert("Ошибка при редактировании комментария.");
        }
    };


    return (
        <div className="comment-card">
            <div className="comment-header">
                <strong>{comment.user.firstName} {comment.user.lastName}</strong>
                <span>{comment.rating} ★</span>
            </div>
            {isEditing ? (
                <>
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <select value={editRating} onChange={e => setEditRating(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n} ★</option>
                        ))}
                    </select>
                    <div className="comment-actions">
                        <button onClick={handleUpdate}>Сохранить</button>
                        <button onClick={() => setIsEditing(false)}>Отмена</button>
                    </div>
                </>
            ) : (
                <>
                    <p>{comment.commentText}</p>
                    {isOwner && (
                        <div className="comment-actions">
                            <button onClick={() => setIsEditing(true)}>Редактировать</button>
                            <button onClick={handleDelete}>Удалить</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default CommentCard;
