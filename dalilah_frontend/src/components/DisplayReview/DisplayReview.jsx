import { useState } from "react";

export default function DisplayReview({ user, review, handleDeleteReview, handleUpdateReview }) {
    const [editReview, setEditReview] = useState(false);
    const [formData, setFormData] = useState(review.content);
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(prev => !prev);
    }

    function handleSave() {
        handleUpdateReview(review.id, formData);
        setFormData("");
        setEditReview(false);
        setMenuOpen(false);
    }

    return (
        <li className="review-item">
            <div className="review-header">
                <span className="review-user">{review.user.username}</span>
                {user.id === review.user.id && (
                    <div className="review-menu-container">
                        <button className="menu-button" onClick={toggleMenu}>⋮</button>
                        {menuOpen && (
                            <div className="menu-dropdown">
                                <button onClick={() => { setEditReview(true); setMenuOpen(false); }}>Edit</button>
                                <button onClick={() => { handleDeleteReview(review.id); setMenuOpen(false); }}>Delete</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {editReview ? (
                <div className="edit-section">
                    <input
                        type="text"
                        value={formData}
                        onChange={(e) => setFormData(e.target.value)}
                        className="edit-input"
                    />
                    <button onClick={handleSave} className="save-review-btn">💾</button>
                    <button onClick={() => setEditReview(false)} className="cancel-review-btn">✖️</button>
                </div>
            ) : (
                <p className="review-content">{review.content}</p>
            )}
        </li>
    );
}
